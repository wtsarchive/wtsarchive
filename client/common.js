/*
 * client/common.js
 * Common code for the client
 */

// Configure the spinner package
Meteor.Spinner.options = {
    lines: 12,
    length: 10,
    width: 5,
    radius: 15,
    rotate: 0,
    direction: 1,
    color: '#000',
    speed: 2
};

UI.registerHelper('isAdmin', function() {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
});

UI.registerHelper('isLoggedIn', function() {
    return !!Meteor.userId();
});

UI.registerHelper('languages', function() {
    return Languages.find({}, {sort: {name: 1}});
});

// Global method and template helper to return text strings
UI.registerHelper("_", function(id) {
    var args = Array.prototype.slice.call(arguments, 1).slice(0, -1);
    var result;

    if (typeof(args) != "undefined" && args.length > 0)
        result = __.apply(null, [id, args]);
    else
        result = __(id);

    return result.replace(/\n/g, "<br>");
});

AccountsTemplates.configure({
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  lowercaseUsername: true,
  focusFirstInput: true,
  onSubmitHook: function(error, state) {
    if (!error && state == 'signIn')
      Router.go('admin.index');
  }
});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: __('Invalid email'),
  },
  pwd
]);

Subs = new SubsManager();

Page = {
    render: function(title, text) {
        return "## " + title + "\n\n" + text;
    },
    show: function(page) {
        if (!page)
            return this.render("Not found", "Requested article has not been found!");
        else
            return this.render(page.title, page.text);
    },
    getByIdentifier: function(id, returnObj) {
        var page = Pages.findOne({identifier: id, language: Session.get("language")});
        if (returnObj) return page;
        return this.show(page);
    },
    getBySlug: function(slug, returnObj) {
        var page = Pages.findOne({slug: slug});
        if (returnObj) return page;
        return this.show(page);
    }
};

Deps.autorun(function() {
    var lang = Session.get("language");
    T9n.setLanguage(lang);
});

// Detect language
if (navigator) {
  var lang = navigator.language || navigator.userLanguage;
  if (!lang) Session.set("language", "en");
  if (lang.toLowerCase() == "pl" || lang.toLowerCase() == "pl-pl") {
    Session.set("language", "pl");
    Session.set("adminSelectedLanguage", "pl");
  }
  else {
    Session.set("language", "en");
  }
}

fileSize = function(a,b,c,d,e){
 return (b=Math,c=b.log,d=1024,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)+' '+(e?'kMGTPEZY'[--e]+'B':'Bytes');
};

// Search
var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};

ItemSearch = new SearchSource('items', ['code', 'title', 'text'], options);

// CFS Chunk size for uploads
FS.config.uploadChunkSize = 524288;

// Setup Markdown renderer and lexer
var markdownRenderer = new marked.Renderer();
markdownRenderer.table = function(header, body) {
  return '<table class="table table-striped">\n'
  + '<thead>\n'
  + header
  + '</thead>\n'
  + '<tbody>\n'
  + body
  + '</tbody>\n'
  + '</table>\n';
};

var markdownLexer = new marked.Lexer();
markdownLexer.rules.code = /^\0$/;

Markdown.setOptions({
  renderer: markdownRenderer
});

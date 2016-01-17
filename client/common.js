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

Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});

Subscription = {
    _subscriptions: {},
    create: function(name) {
        this._subscriptions[name] = {
            dep: new Deps.Dependency(),
            sub: null
        };
    },
    get: function(name) {
        return this._subscriptions[name].sub;
    },
    ready: function(name) {
        this._subscriptions[name].dep.depend();
        if (this._subscriptions[name].sub === null) return false;
        return this._subscriptions[name].sub.ready();
    },
    subscribe: function(name) {
        var args = [name].concat(Array.prototype.slice.call(arguments, 1));
        this._subscriptions[name].sub = Meteor.subscribe.apply(null, args);
        var self = this;
        Deps.autorun(function() {
            var ready = self._subscriptions[name].sub.ready();
            self._subscriptions[name].dep.changed();
        });
    },
    createAndSubscribe: function(name) {
        this.create(name);
        this.subscribe(name);
    }
};

Page = {
    render: function(title, text) {
        return "## " + title + "\n\n" + text;
    },
    show: function(page) {
        if (!Subscription.ready('pages')) return "Loading...";
        if (!page)
            return this.render("Not found", "Requested article has not been found!");
        else
            return this.render(page.title, page.text);
    },
    getByIdentifier: function(id) {
        var page = Pages.findOne({identifier: id, language: Session.get("language")});
        return this.show(page);
    },
    getBySlug: function(slug) {
        var page = Pages.findOne({slug: slug});
        return this.show(page);
    }
};

Deps.autorun(function() {
    var lang = Session.get("language");
    accountsUIBootstrap3.setLanguage(lang);
});

// Detect language
if (navigator) {
  var lang = navigator.language || navigator.userLanguage;
  if (!lang) Session.set("language", "en");
  if (lang.toLowerCase() == "pl" || lang.toLowerCase() == "pl-pl") {
    Session.set("language", "pl");
  }
  else {
    Session.set("language", "en");
  }
}

fileSize = function(a,b,c,d,e){
 return (b=Math,c=b.log,d=1024,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)+' '+(e?'kMGTPEZY'[--e]+'B':'Bytes');
};

Subscription.createAndSubscribe("languages");
Subscription.createAndSubscribe("categories");
Subscription.createAndSubscribe("pages");
Subscription.createAndSubscribe("covers");

// Search
var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};

ItemSearch = new SearchSource('items', ['code', 'title', 'text'], options);

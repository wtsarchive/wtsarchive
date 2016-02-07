/*
 * lib/router/config.js
 * Meteor Router global configuration and common code
 */

// Setting page title
setPageTitle = function(text, secondaryText) {
  var title = __(ClientConfig.titlePrefix) + " | " + __(text);
  if (secondaryText)
    title += " | " + s.prune(secondaryText, 55);
  document.title = title;
};

// Configure the router
Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'layout',
    waitOn: function() {
      return [
        Meteor.subscribe("i18n"),
        Meteor.subscribe("languages"),
        Meteor.subscribe("pages"),
        Meteor.subscribe("categories")
      ];
    }
});

// Loading route
Router.route('/loading', {
    name: 'loading'
});

// Login route
Router.route('/login', {
    name: 'login'
});

// Initial route
Router.route('/', {
    name: 'home',
    data: function() {
        return {identifier: "homepage"};
    },
    action: function() {
        this.render('article');
    },
    onAfterAction: function() {
      setPageTitle(ClientConfig.defaultPageTitle);
    }
});

// Publications routes
Router.route('/pubs', {
    name: 'pubs.index',
    onAfterAction: function() {
      setPageTitle('Publications');
    }
});

Router.route('/pubs/:slug', {
    name: 'pubs.list',
    data: function() {
      return {slug: this.params.slug};
    },
    action: function() {
      this.state.set('perPage', this.params.query.perPage || ClientConfig.defaultPerPage);
      this.render('items.list');
    },
});

Router.route('/pub/:slug', {
    name: 'pubs.view',
    data: function() {
        return {slug: this.params.slug};
    },
    action: function() {
      this.render('items.view');
    },
});

// Letters routes
Router.route('/letters', {
    name: 'letters.index',
});

Router.route('/letters/:slug', {
    name: 'letters.list',
    data: function() {
      return {slug: this.params.slug};
    },
    action: function() {
      this.state.set('perPage', this.params.query.perPage || ClientConfig.defaultPerPage);
      this.render('items.list');
    },
});

Router.route('/letter/:slug', {
    name: 'letters.view',
    data: function() {
        return {slug: this.params.slug};
    },
    action: function() {
      this.render('items.view');
    },
});

// Publications by tag
Router.route('/tag/:tag', {
    name: 'tag.view',
    action: function() {
      this.render('items.list');
    },
    data: function() {
        return {tag: this.params.tag};
    },
});

// Article routes
Router.route('/article/:slug', {
    name: 'article',
    data: function() {
        return {slug: this.params.slug};
    },
});

// Admin routes
var adminHook = function() {
    if (!Roles.userIsInRole(Meteor.userId(), "admin"))
        this.redirect('/');
    else {
        Subs._ready = true;
        Subs.dep.changed();
        this.next();
    }
};

Router.route('/admin', {
    name: 'admin.index',
    onBeforeAction: adminHook
});

Router.route('/admin/items/add', {
    name: 'admin.items.add',
    onBeforeAction: adminHook
});

Router.route('/admin/items/edit/:_id', {
    name: 'admin.items.edit',
    onBeforeAction: adminHook,
    data: function() {
        return {_id: this.params._id};
    }
});

Router.route('/admin/items', {
    name: 'admin.items.list',
    onBeforeAction: adminHook
});

Router.route('/admin/categories/add', {
    name: 'admin.categories.add',
    onBeforeAction: adminHook
});

Router.route('/admin/categories', {
    name: 'admin.categories.list',
    onBeforeAction: adminHook
});

Router.route('/admin/categories/edit/:_id', {
    name: 'admin.categories.edit',
    onBeforeAction: adminHook,
    data: function() {
        return {_id: this.params._id};
    }
});

Router.route('/admin/pages/add', {
    name: 'admin.pages.add',
    onBeforeAction: adminHook
});

Router.route('/admin/pages/list', {
    name: 'admin.pages.list',
    onBeforeAction: adminHook
});

Router.route('/admin/pages/edit/:_id', {
    name: 'admin.pages.edit',
    onBeforeAction: adminHook,
    data: function() {
        return {_id: this.params._id};
    }
});

Router.route('/admin/translations', {
    name: 'admin.strings.manage',
    onBeforeAction: adminHook
});

Router.route('/admin/translations/edit/:_id', {
    name: 'admin.strings.edit',
    onBeforeAction: adminHook,
    data: function() {
        return {_id: this.params._id};
    }
});

Router.route('/admin/translate/languages', {
    name: 'admin.strings.languages',
    onBeforeAction: adminHook
});

// Reset search
if (Meteor.isClient) {
  Router.onAfterAction(function() {
    Session.set("search", "");
      if (Router.current().route.getName().indexOf("admin") === 0)
        setPageTitle("Admin panel");
  });
}

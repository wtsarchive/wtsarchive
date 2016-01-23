/*
 * lib/router/config.js
 * Meteor Router global configuration and common code
 */

// Configure the router
Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'layout',
    waitOn: function() {
      return Meteor.subscribe("i18n");
    }
});

// Loading route
Router.route('/loading', {
    name: 'loading'
});

// Initial route
Router.route('/', {
    name: 'home',
    data: function() {
        return {identifier: "homepage"};
    },
    action: function() {
        this.render('article');
    }
});

// Publications routes
Router.route('/pubs', {
    name: 'pubs.index',
    subscriptions: function() {
      return Meteor.subscribe('items-recent', Session.get("language"), 'Publication');
    }
});

Router.route('/pubs/:slug', {
    name: 'pubs.list',
    data: function() {
      return {slug: this.params.slug};
    },
    action: function() {
      this.state.set('years', Util.getResponse("itemYearsByCategory"));
      this.render('items.list');
    },
    waitOn: function() {
      return Util.waitOnServer("itemYearsByCategory", this.params.slug);
    },
    subscriptions: function() {
      var category = Categories.findOne({slug: this.params.slug});
      return Meteor.subscribe('items-category', category._id);
    }
});

Router.route('/pub/:slug', {
    name: 'pubs.view',
    data: function() {
        return {slug: this.params.slug};
    },
    action: function() {
      this.render('items.view');
    },
    subscriptions: function() {
      return Meteor.subscribe('items-slug', this.params.slug);
    }
});

// Letters routes
Router.route('/letters', {
    name: 'letters.index',
    subscriptions: function() {
      return Meteor.subscribe('items-recent', Session.get("language"), 'Letter');
    }
});

Router.route('/letters/:slug', {
    name: 'letters.list',
    data: function() {
        return {slug: this.params.slug};
    },
    action: function() {
      this.state.set('years', Util.getResponse("itemYearsByCategory"));
      this.render('items.list');
    },
    waitOn: function() {
      return Util.waitOnServer("itemYearsByCategory", this.params.slug);
    },
    subscriptions: function() {
      var category = Categories.findOne({slug: this.params.slug});
      return Meteor.subscribe('items-category', category._id);
    }
});

Router.route('/letter/:slug', {
    name: 'letters.view',
    data: function() {
        return {slug: this.params.slug};
    },
    action: function() {
      this.render('items.view');
    },
    subscriptions: function() {
      return Meteor.subscribe('items-slug', this.params.slug);
    }
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
    subscriptions: function() {
      return Meteor.subscribe('items-tag', this.params.tag);
    }
});

// Article routes
Router.route('/article/:slug', {
    name: 'article',
    data: function() {
        return {slug: this.params.slug};
    }
});

// Admin routes
var adminHook = function() {
    if (!Roles.userIsInRole(Meteor.userId(), "admin"))
        this.redirect('/');
    else
        this.next();
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
  });
}

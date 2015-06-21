/*
 * lib/router/config.js
 * Meteor Router global configuration and common code
 */

// Configure the router
Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'layout'
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
    name: 'pubs.index'
});

Router.route('/pubs/:slug', {
    name: 'pubs.list',
    data: function() {
        return {slug: this.params.slug};
    }
});

// Letters routes
Router.route('/letters', {
    name: 'letters.index'
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

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
    name: 'home'
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

// Admin routes
Router.route('/admin', {
    name: 'admin.index'
});

Router.route('/admin/items/add', {
    name: 'admin.items.add'
});

Router.route('/admin/items', {
    name: 'admin.items.list'
});

Router.route('/admin/translate/strings', {
    name: 'admin.strings.manage'
});

Router.route('/admin/translate/languages', {
    name: 'admin.strings.languages'
});

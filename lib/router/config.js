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
Router.route('/', function () {
    this.render('home');
});

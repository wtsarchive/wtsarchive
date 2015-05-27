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
    render: function(page) {
        return "## " + page.title + "\n\n" + page.text;
    },
    getByIdentifier: function(id) {
        var page = Pages.findOne({identifier: 'homepage'});
        if (!Subscription.ready('pages')) return "Loading...";
        return this.render(page);
    }
};

Subscription.createAndSubscribe("categories");
Subscription.createAndSubscribe("pages");

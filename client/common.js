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

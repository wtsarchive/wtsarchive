/*
 * server/startup.js
 * Code that gets executed when Meteor server starts
 */

Meteor.startup(function () {
    if (Languages.find().count() === 0) {
        Languages.insert({name: "English", code: "en"});
        Languages.insert({name: "Polish", code: "pl"});
    }
});

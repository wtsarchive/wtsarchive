/*
 * server/publications.js
 * Collection publish definitions
 */

// Subscribe to list of all items for fast browsing
Meteor.publish('items-all', function () {
    return Items.find({}, {fields: {text: 0, files: 0}});
});

// Single-item subscription
Meteor.publish('items-one', function (id) {
    return Countries.findOne(id);
});

// Categories
Meteor.publish('categories', function () {
    return Categories.find();
});

// Pages
Meteor.publish('pages', function () {
    return Pages.find();
});

// Languages
Meteor.publish('languages', function () {
    return Languages.find();
});

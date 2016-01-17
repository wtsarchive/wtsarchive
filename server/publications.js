/*
 * server/publications.js
 * Collection publish definitions
 */

// Recent items
Meteor.publish('items-recent', function (lang, type) {
  if (type)
    return Items.find({language: lang, type: type}, {sort: {added_on: -1}, limit: 10, fields: {text: 0, files: 0}});
  else
    return Items.find({language: lang}, {sort: {added_on: -1}, limit: 5, fields: {text: 0, files: 0}});
});

// Items in category
Meteor.publish('items-category', function (categoryId) {
    return Items.find({category: categoryId});
});

// Items in a tag
Meteor.publish('items-tag', function (tag) {
    return Items.find({tags: tag});
});

// Single-item subscriptions
Meteor.publish('items-one', function (id) {
    return Items.find({_id: id});
});
Meteor.publish('items-slug', function (slug) {
    return Items.find({slug: slug});
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

// Publish application strings (text content)
Meteor.publish('i18n', function (id) {
    return Strings.find();
});

// Publish cover images
Meteor.publish('covers', function() {
    return Covers.find();
});

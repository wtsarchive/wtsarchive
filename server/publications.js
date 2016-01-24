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
Meteor.publish('items-category', function (categoryId, options) {
  if (!options) options = {page: 1};
  if (!options.perPage) options.perPage = 10;

  var cursorOpts = {
    sort: {published_on: -1},
    skip: (parseInt(options.page) - 1) * parseInt(options.perPage),
    limit: parseInt(options.perPage)
  };

  if (!cursorOpts.skip || cursorOpts.skip < 0) 
    cursorOpts.skip = 0;

  if (!options.year || options.year == 'all') {
    return Items.find({category: categoryId, language: options.lang}, cursorOpts);
  }
  else {
    var start = new Date(options.year, 0, 1);
    var end = new Date(options.year, 11, 30);
    return Items.find({category: categoryId, language: options.lang, published_on: {$gte: start, $lte: end}}, cursorOpts);
  }
});

// Items in a tag
Meteor.publish('items-tag', function (tag, options) {
    return Items.find({tags: tag, language: options.lang});
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

/*
 * server/publications.js
 * Collection publish definitions
 */

var itemPublish = function(findFn) {
  return {
    find: findFn,
    children: [
      {
        find: function(item) {
          var id = item.cover || '';
          return Covers.find({_id: id});
        }
      }
    ]
  };
};

// Recent items
Meteor.publishComposite('items-recent', function (lang, type) {
  return itemPublish(function() {
    if (type)
      return Items.find({language: lang, type: type}, {sort: {added_on: -1}, limit: 10, fields: {text: 0, files: 0}});
    else
      return Items.find({language: lang}, {sort: {added_on: -1}, limit: 5, fields: {text: 0, files: 0}});
  });
});

// Items in category
Meteor.publishComposite('items-category', function (categoryId, options) {
  return itemPublish(function() {
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
      var end = new Date(options.year, 11, 31, 23, 59, 59);
      return Items.find({category: categoryId, language: options.lang, published_on: {$gte: start, $lte: end}}, cursorOpts);
    }
  });
});

// Items in a tag
Meteor.publishComposite('items-tag', function (tag, options) {
  return itemPublish(function() {
    return Items.find({tags: tag, language: options.lang});
  });
});

// Single-item subscriptions
Meteor.publishComposite('items-one', function (id) {
  return itemPublish(function() {
    return Items.find({_id: id});
  });
});
Meteor.publishComposite('items-slug', function (slug) {
  return itemPublish(function() {
    return Items.find({slug: slug});
  });
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

// Items tabular (for admins)
Meteor.publishComposite('admin-items-tabular', function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  return {
    find: function() {
      if (Roles.userIsInRole(this.userId, 'admin')) {
        return Items.find({_id: {$in: ids}}, {fields: fields});
      }
      return this.ready();
    },
    children: [
      {
        find: function(item) {
          return Covers.find({_id: item.cover});
        }
      }
    ]
  };
});

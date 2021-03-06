Pages = new Mongo.Collection('pages');
PagesSchemas = {};

PagesSchemas.Page = new SimpleSchema({
    title: {
        type: String,
        label: "Page title"
    },
    identifier: {
        type: String,
        label: "Identifier",
        optional: true
    },
    language: {
        type: String,
        label: "Language",
        defaultValue: "en",
        autoform: {
            options: function () {
                return [
                    {label: "English", value: "en"},
                    {label: "Polish", value: "pl"}
                ];
            }
        }
    },
    slug: {
        type: String,
        label: "Slug",
        autoValue: function() {
            var name = s.slugify(this.field('title').value);
            if (this.isInsert) {
                return name;
            } else if (this.isUpsert) {
                return {$setOnInsert: name};
            } else {
                this.unset();
            }
        },
        autoform: {
            type: "hidden"
        }
    },
    text: {
        type: String,
        label: "Content",
        autoform: {
            rows: 8
        }
    },
    views: {
      type: Number,
      label: "View count",
      defaultValue: 0,
      autoform: {
          type: "hidden"
      }
    }
});

Pages.attachSchema(PagesSchemas.Page);

Meteor.methods({
    addPage: function(page) {
        if (!Roles.userIsInRole(Meteor.userId(), "admin"))
            throw new Meteor.Error(403, "Permission denied.");
        
        Pages.insert(page);
    },
    updatePage: function(page, id) {
        if (!Roles.userIsInRole(Meteor.userId(), "admin"))
            throw new Meteor.Error(403, "Permission denied.");
        
        Pages.update(id, page);
    }
});

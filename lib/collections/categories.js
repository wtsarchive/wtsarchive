ItemTypes = [
    "Publication",
    "Letter"
];

Categories = new Mongo.Collection('categories');
CategoriesSchemas = {};

CategoriesSchemas.Category = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    slug: {
        type: String,
        label: "Slug",
        autoValue: function() {
            var name = this.field('name');
            return s.slugify(name.value);
        },
        autoform: {
            type: "hidden"
        }
    },
    type: {
        type: String,
        allowedValues: ItemTypes,
        label: "Type"
    },
    description: {
        type: String,
        label: "Description",
        autoform: {
            rows: 5
        },
    },
    language: {
        type: String,
        label: "Language",
        defaultValue: "en",
        autoform: {
            options: function () {
                var options = [];
                Languages.find().forEach(function (element) {
                    options.push({
                        label: element.name, value: element.code
                    });
                });
                return options;
            }
        }
    }
});

Categories.attachSchema(CategoriesSchemas.Category);

Meteor.methods({
    addCategory: function(category) {
        Validate.isAdmin();

        Categories.insert(category);
    },
    updateCategory: function(category, id) {
        Validate.isAdmin();

        Categories.update(id, category);
    },
    removeCategory: function(id) {
        Validate.isAdmin();

        Categories.remove(id);
    }
});

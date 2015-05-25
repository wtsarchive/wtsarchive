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
        }
    },
    lang: {
        type: String,
        label: "Language",
        defaultValue: "en"
    }
});

Categories.attachSchema(CategoriesSchemas.Category);

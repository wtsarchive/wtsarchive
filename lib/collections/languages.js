Languages = new Mongo.Collection('languages');
LanguagesSchemas = {};

LanguagesSchemas.Language = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    code: {
        type: String,
        label: "Language code"
    }
});

Languages.attachSchema(LanguagesSchemas.Language);

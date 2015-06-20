Languages = new Mongo.Collection('languages');
LanguagesSchemas = {};

LanguagesSchemas.Language = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    code: {
        type: String,
        regEx: /^[a-zA-Z_]{2,5}$/,
        label: "Language code"
    }
});

Languages.attachSchema(LanguagesSchemas.Language);

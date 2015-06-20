Strings = new Mongo.Collection('strings');

StringsSchemas = {};

StringsSchemas.Translation = new SimpleSchema({
    language: {
        type: String
    },
    text: {
        type: String,
        optional: true
    }
});

StringsSchemas.String = new SimpleSchema({
    id: {
        type: String,
    },
    text: {
        type: String,
    },
    text_sort: {
        type: String,
        autoValue: function() {
            var text = this.field('text');
            if (text.isSet) {
                return text.value.toLowerCase();
            }
        }
    },
    i18n: {
        type: [StringsSchemas.Translation],
        optional: true
    }
});

Strings.attachSchema(StringsSchemas.String);

Meteor.methods({
    addString: function(content) {
        Validate.isAdmin();

        var check = Strings.findOne({id: SHA256(content).slice(32)});
        if (!check)
            return Strings.insert({id: SHA256(content).slice(32), text: content});
        else
            return check;
    },
    updateString: function(id, content, i18n) {
        Validate.isAdmin();

        var updateObj = {text: content};
        if (i18n)
            updateObj.i18n = i18n;

        return Strings.update(id, {$set: updateObj});
    }
});

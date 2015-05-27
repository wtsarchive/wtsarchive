Items = new Mongo.Collection('items');
ItemsSchemas = {};

ItemsSchemas.File = new SimpleSchema({
    type: {
        type: String,
        label: "File type",
        allowedValues: [
            "PDF",
            "Image",
            "Movie"
        ]
    },
    filesize: {
        type: Number,
        label: "File size (in bytes)"
    },
    url: {
        type: String,
        label: "File URL",
        autoValue: function() {
            // Add http:// if not present
            var url = this.value;
            if (url && url.indexOf("://") === -1) {
                return "http://" + this.value;
            }
        }
        
    },
    order: {
        type: Number,
        optional: true,
        autoform: {
            type: "hidden"
        }
    }
});

ItemsSchemas.Item = new SimpleSchema({
    type: {
        type: String,
        allowedValues: [
            "Publication",
            "Letter"
        ],
        label: "Type"
    },
    category: {
        type: SimpleSchema.RegEx.Id,
        label: "Publication type",
        optional: true,
        autoform: {
            options: function () {
                var options = [];
                Categories.find().forEach(function (element) {
                    options.push({
                        label: element.name, value: element._id
                    });
                });
                return options;
            }
        }
    },
    language: {
        type: String,
        label: "Language",
        autoform: {
            options: function () {
                return [
                    {label: "English", value: "en"},
                    {label: "Polish", value: "pl"}
                ];
            }
        }
    },
    title: {
        type: String,
        label: "Title"
    },
    text: {
        type: String,
        label: "Content",
        autoform: {
            rows: 5
        },
        optional: true
    },
    added_on: {
        type: Date,
        label: "Added on",
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();
            }
        },
        autoform: {
            type: "hidden"
        }
    },
    added_by: {
        type: SimpleSchema.RegEx.Id,
        label: "Submitted by",
        autoValue: function() {
            if (this.isInsert) {
                return Meteor.userId();
            } else if (this.isUpsert) {
                return {$setOnInsert: Meteor.userId()};
            } else {
                this.unset();
            }
        },
        autoform: {
            type: "hidden"
        }
    },
    published_on: {
        type: Date,
        label: "Publication date",
        optional: true,
        autoform: {
            afFieldInput: {
                type: "bootstrap-datepicker"
            }
        }
    },
    files: {
        type: [ItemsSchemas.File],
        label: "Files",
        optional: true
    },
    cover: {
        type: String,
        label: "Cover URL",
        optional: true
    },
    tags: {
        type: [String],
        label: "Tags",
        optional: true
    }
});

Items.attachSchema(ItemsSchemas.Item);

Meteor.methods({
    addItem: function(item) {
        if (!Roles.userIsInRole(Meteor.userId(), "admin"))
            throw new Meteor.Error(403, "Permission denied.");

        if (item.files) {
            for(var i = 0; i < item.files.length; i++) {
                item.files[i].order = i;
            }
        }

        Items.insert(item);
    }
});

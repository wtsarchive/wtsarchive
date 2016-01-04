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
    name: {
      type: String,
      label: "File name"
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
        allowedValues: ItemTypes,
        label: "Type"
    },
    category: {
        type: SimpleSchema.RegEx.Id,
        label: "Category",
        optional: true,
        autoform: {
            options: function () {
                var result = [];
                ItemTypes.forEach(function(type) {
                    var options = [];
                    Categories.find({type: type}).forEach(function (element) {
                        options.push({
                            label: element.name, value: element._id
                        });
                    });
                    result.push({
                        optgroup: type,
                        options: options
                    });
                });
                return result;
            }
        }
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
    },
    title: {
        type: String,
        label: "Title"
    },
    code: {
        type: String,
        label: "Code",
        index: true,
        unique: true
    },
    slug: {
        type: String,
        label: "Slug",
        index: true,
        autoValue: function() {
            return s.slugify(this.field('code').value) + "_" + s.slugify(this.field('title').value);
        },
        autoform: {
            type: "hidden"
        }
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
        label: "Cover",
        autoform: {
            afFieldInput: {
                type: "fileUpload",
                collection: "Covers",
                label: "Upload cover image"
            }
        },
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
        Validate.isAdmin();

        if (item.files) {
            for(var i = 0; i < item.files.length; i++) {
                item.files[i].order = i;
            }
        }

        ItemsSchemas.Item.clean(item);
        Items.insert(item);
    },
    updateItem: function(item, id) {
        Validate.isAdmin();

        if (item.files) {
            for(var i = 0; i < item.files.length; i++) {
                item.files[i].order = i;
            }
        }

        ItemsSchemas.Item.clean(item);
        Items.update(id, item);
    },
    removeItem: function(id) {
        Validate.isAdmin();
        Items.remove(id);
    }
});

Items = new Mongo.Collection('items');
ItemsSchemas = {};

ItemsSchemas.File = new SimpleSchema({
    type: {
        type: String,
        label: "File type"
    },
    filesize: {
        type: Number,
        label: "File size"
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
        type: Number
    }
});

ItemsSchemas.Item = new SimpleSchema({
    type: {
        type: String,
        label: "Type"
    },
    title: {
        type: String,
        label: "Title"
    },
    text: {
        type: String,
        label: "Content",
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
        }
    },
    published_on: {
        type: Date,
        label: "Publication date",
        optional: true
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

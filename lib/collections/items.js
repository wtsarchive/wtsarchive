Items = new Mongo.Collection('items');
ItemsSchemas = {};

ItemsSchemas.File = new SimpleSchema({
    type: {
        type: String,
        label: "File type",
        allowedValues: [
            "PDF",
            "Image",
            "Movie",
            "Archive",
            "Audio"
        ]
    },
    name: {
      type: String,
      label: "File name",
      optional: true
    },
    filesize: {
        type: Number,
        label: "File size (in bytes)",
        optional: true
    },
    url: {
        type: String,
        label: "File URL",
        optional: true
    },
    file: {
        type: String,
        label: "Upload a file",
        autoform: {
            afFieldInput: {
                type: "fileUpload",
                collection: "Downloads",
                label: "Upload"
            }
        },
        optional: true
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
              var options = [];
              var type = AutoForm.getFieldValue('type') || ItemTypes[0];
              var language = AutoForm.getFieldValue('language'); 
              if (!language) 
                language = Meteor.isClient && Session.get("adminSelectedLanguage");

              Categories.find({language: language, type: type}).forEach(function (element) {
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
        unique: true,
        autoform: {
          placeholder: "Eg.: ks10-E"
        }
    },
    normalizedCode: {
        type: String,
        label: "Language Independent Code",
        index: true,
        optional: true,
        autoValue: function() {
            var code = this.field('code').value;
            if (!code) return;
            code = code.substring(0, code.lastIndexOf("-"));
            return code || this.field('code').value;
        },
        autoform: {
          type: "hidden"
        }
    },
    slug: {
        type: String,
        label: "Slug",
        index: true,
        autoValue: function() {
          if (!this.field('code').value) this.unset();
          else
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
        autoform: {
            afFieldInput: {
              type: "bootstrap-datepicker",
              datePickerOptions: {
                format: "yyyy-mm-dd"
              }
            },
            placeholder: "yyyy-mm-dd"
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

Items.attachSchema(ItemsSchemas.Item);

Items.helpers({
  titleWithCode: function() {
    return this.title + " (" + this.code + ")";
  },
  hasCover: function() {
    if (!this.cover) return false;
    var cover = Covers.findOne(this.cover);
    if (!cover || !cover.url()) return false;
    return true;
  },
  hasTags: function() {
    return this.tags && this.tags.length > 0;
  },
  coverUrl: function() {
    var cover = Covers.findOne(this.cover);
    if (!cover || !cover.url) {
      if (this.type == "Publication")
        return "/images/no-image.png";
      else
        return "/images/no-image-letter.png";
    }
    return cover.url();
  },
  coverOriginalUrl: function() {
    var cover = Covers.findOne(this.cover);
    if (!cover || !cover.url) {
      if (this.type == "Publication")
        return "/images/no-image.png";
      else
        return "/images/no-image-letter.png";
    }
    if (cover.size({store: 'covers-original'}) > 0)
      return cover.url({store: 'covers-original'});
    else 
      return cover.url();
  }
});

function setFileMetadata(item) {
  if (item.file) {
    var file = Downloads.findOne(item.file);
    item.name = file.name();
    item.filesize = file.size();
    item.url = file.url();
  }
}

Meteor.methods({
    addItem: function(item) {
        Validate.isAdmin();

        if (item.files) {
            for(var i = 0; i < item.files.length; i++) {
                item.files[i].order = i;
                if (item.files[i].file) 
                  setFileMetadata(item.files[i]);
            }
        }

        ItemsSchemas.Item.clean(item);
        Items.insert(item);
    },
    updateItem: function(item, id) {
        Validate.isAdmin();

        if (item.$set.files) {
            for(var i = 0; i < item.$set.files.length; i++) {
              if (item.$set.files[i]) {
                item.$set.files[i].order = i;
                if (item.$set.files[i].file) 
                  setFileMetadata(item.$set.files[i]);
              }
            }
        }

        ItemsSchemas.Item.clean(item.$set);
        Items.update(id, item);
    },
    removeItem: function(id) {
        Validate.isAdmin();
        Items.remove(id);
    }
});

if (Meteor.isServer) {
  Items._ensureIndex({
    "title": "text",
    "text": "text"
  }, {
    "default_language": "en",
    "language_override": "en" 
  });
}

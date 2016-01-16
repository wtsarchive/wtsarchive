Downloads = new FS.Collection("downloads", {
  stores: [
    new FS.Store.FileSystem("downloads")
  ]
});

Downloads.allow({
  insert: function(userId, doc) {
    return Validate.isAdmin(userId);
  },
  update: function(userId, doc) {
    return Validate.isAdmin(userId);
  },
  download: function(userId) {
    return true;
  }
});


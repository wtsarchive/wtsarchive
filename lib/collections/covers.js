var resizeCover = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('240', '320').stream().pipe(writeStream);
};

Covers = new FS.Collection("covers", {
  stores: [
    new FS.Store.FileSystem("covers", { transformWrite: resizeCover })
  ],
  filter: {
    allow: {
      contentTypes: ['image/*'] 
    }
  }
});

Covers.allow({
    insert: function(userId, doc) {
        return true; // FIXME: Should be: Validate.isAdmin(); but this returns an error
    },
    update: function(userId, doc) {
        return true; // FIXME: Should be: Validate.isAdmin();
    },
    download: function(userId) {
        return true;
    }
});

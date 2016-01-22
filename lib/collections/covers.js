var resizeCover = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('240', '320').stream().pipe(writeStream);
};

var resizeCoverSmall = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('68', '94').stream().pipe(writeStream);
};


Covers = new FS.Collection("covers", {
  stores: [
    new FS.Store.FileSystem("covers", { 
      transformWrite: resizeCover
    }),
    new FS.Store.FileSystem("covers-original", {
    }),
    new FS.Store.FileSystem("covers-small", {
      transformWrite: resizeCoverSmall
    })
  ],
  filter: {
    allow: {
      contentTypes: ['image/*'] 
    }
  }
});

Covers.allow({
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

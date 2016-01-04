Template.pubsView.onCreated(function () {
    var instance = this;
    this.autorun(function() {
        instance.subscribe('items-slug', instance.data.slug);
    });
});

Template.pubsView.helpers({
  notFound: function() {
    var item = Items.findOne({slug: this.slug});
    return !item;
  },
  item: function() {
    var item = Items.findOne({slug: this.slug});
    return item;
  }
});

Template.pubsViewFile.helpers({
  size: function() {
    return fileSize(this.filesize);
  }
});

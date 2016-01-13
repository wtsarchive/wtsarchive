Template.lettersView.onCreated(function () {
    var instance = this;
    this.autorun(function() {
        instance.subscribe('items-slug', instance.data.slug);
    });
});

Template.lettersView.helpers({
  notFound: function() {
    var item = Items.findOne({slug: this.slug});
    return !item;
  },
  item: function() {
    var item = Items.findOne({slug: this.slug});
    return item;
  }
});

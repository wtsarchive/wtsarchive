Template.itemsView.helpers({
  notFound: function() {
    var item = Items.findOne({slug: this.slug});
    return !item;
  },
  item: function() {
    var item = Items.findOne({slug: this.slug});
    return item;
  },
  isPublication: function() {
    var item = Items.findOne({slug: this.slug});
    return item.type == "Publication";
  }
});


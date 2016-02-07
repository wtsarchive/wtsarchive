Template.itemsView.onCreated(function() {
    var template = this;
    template.autorun(function() {
        Subs.subscribe('items-slug', template.data.slug);
        var item = Items.findOne({slug: template.data.slug});
        if (item) {
          setPageTitle(item.type + 's', item.title);
          Meteor.call("itemView", item._id);
        }
    });
});

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
    return !item || item.type == "Publication";
  }
});


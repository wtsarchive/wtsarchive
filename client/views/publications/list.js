Template.pubsList.helpers({
  notFound: function() {
    var category = Categories.findOne({slug: this.slug});
    return !category && Subscription.ready("categories");
  },
  category: function() {
    if (!Subscription.ready("categories")) return;
    var category = Categories.findOne({slug: this.slug});
    return category.name;
  },
  items: function() {
    if (!Subscription.ready("categories")) return;
    var category = Categories.findOne({slug: this.slug});
    return Items.find({category: category._id, language: Session.get("language")});
  }
});

Template.pubsListItem.helpers({
    image: function() {
        return Covers.findOne(this.cover);
    }
});


Template.adminItemsList.rendered = function() {
  var category = Session.get("adminItemsCategory");
  if (category) {
    $('#admin-items-category').val(category);
  }
};

Template.adminItemsList.helpers({
  categories: function() {
    return Categories.find();
  },
  items: function() {
    var category = Session.get("adminItemsCategory");
    if (category)
      return Items.find({category: category});
    else
      return Items.find();
  }
});

Template.adminItemsList.events({
  "change #admin-items-category": function(e) {
    var category = $(e.currentTarget).val();
    Session.set("adminItemsCategory", category);
  }
});

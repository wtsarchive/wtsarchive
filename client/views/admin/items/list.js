Template.adminItemsList.rendered = function() {
  var category = Session.get("adminItemsCategory");
  if (category) {
    $('#admin-items-category').val(category);
  }
};

Template.adminItemsList.helpers({
  types: function() {
    return ItemTypes;
  },
  categories: function() {
    return Categories.find();
  },
  items: function() {
    var findObj = {};
    var type = Session.get("adminItemsType");
    var category = Session.get("adminItemsCategory");
    var language = Session.get("adminSelectedLanguage");
    if (type)
      findObj.type = type;
    if (category)
      findObj.category = category;
    if (language)
      findObj.language = language;

    return Items.find(findObj);
  }
});

Template.adminItemsList.events({
  "change #admin-items-type": function(e) {
    var type = $(e.currentTarget).val();
    Session.set("adminItemsType", type);
  },
  "change #admin-items-category": function(e) {
    var category = $(e.currentTarget).val();
    Session.set("adminItemsCategory", category);
  }
});

Template.adminItemsItem.helpers({
    image: function() {
        return Covers.findOne(this.cover);
    }
});

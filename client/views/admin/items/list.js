Template.adminItemsList.onRendered = function() {
    var category = Session.get("adminItemsCategory");
    if (category) {
        $('#admin-items-category').val(category);
    }
};

Template.adminItemsList.helpers({
  selector: function() {
    var selector = {language: Session.get('adminSelectedLanguage')};
    var type = Session.get("adminItemsType");
    if (type)
      selector.type = type;

    return selector;
  }
});

Template.adminItemsCellImage.helpers({
  cover: function() {
    return Covers.findOne(this.cover);
  }
});

Template.adminItemsCellActions.events({
  'click button': function(e) {
    Router.go('admin.items.edit', {_id: $(e.target).data('id')});
  }
});

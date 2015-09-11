Template.adminItemsEdit.helpers({
    item: function() {
        return Items.findOne(this._id);
    }
});

Template.adminItemsEdit.events({
    "click #admin-item-delete": function() {
        var check = confirm("Do you want to delete this item?");
        if (check) {
            Meteor.call("removeItem", this._id, function() {
                Router.go('admin.items.list');
            });
        }
    }
});

AutoForm.hooks({
  editItemForm: {
      onSuccess: function() {
          $.bootstrapGrowl("Item saved successfully.", {
              type: 'success'
          });
          window.scrollTo(0, 0);
      },
      onError: function(form, error) {
          $.bootstrapGrowl(error, {
              type: 'danger',
          });
          window.scrollTo(0, 0);
      }
  }
});

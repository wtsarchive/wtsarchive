Template.adminItemsEdit.onCreated(function () {
    var instance = this;
    this.autorun(function () {
        instance.subscribe('items-one', instance.data._id);
    });
});

Template.adminItemsEdit.helpers({
    item: function() {
        return Items.findOne(this._id);
    },
    itemTemplate: function() {
      var item = Items.findOne(this._id);
      if (item.type == "Publication")
        return "pubs.view";
      else
        return "letters.view";
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

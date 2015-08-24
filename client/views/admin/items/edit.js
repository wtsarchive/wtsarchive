Template.adminItemsEdit.helpers({
    item: function() {
        return Items.findOne(this._id);
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

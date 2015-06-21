Template.adminCategoriesEdit.helpers({
    category: function() {
        return Categories.findOne(this._id);
    }
});

AutoForm.hooks({
  editCategoryForm: {
      onSuccess: function() {
          $.bootstrapGrowl("Category saved successfully.", {
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


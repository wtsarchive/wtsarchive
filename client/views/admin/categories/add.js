AutoForm.hooks({
  addCategoryForm: {
      onSuccess: function() {
          $.bootstrapGrowl("Category added successfully.", {
              type: 'success'
          });
          window.scrollTo(0, 0);
      },
      onError: function(form, error) {
          $.bootstrapGrowl("There was an error when trying to insert this category: " + error, {
              type: 'danger',
          });
          window.scrollTo(0, 0);
      }
  }
});


AutoForm.hooks({
  addPageForm: {
      onSuccess: function() {
          $.bootstrapGrowl("Page added successfully.", {
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


Template.adminPagesEdit.helpers({
    page: function() {
        return Pages.findOne(this._id);
    }
});

AutoForm.hooks({
  editPageForm: {
      onSuccess: function() {
          $.bootstrapGrowl("Page saved successfully.", {
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

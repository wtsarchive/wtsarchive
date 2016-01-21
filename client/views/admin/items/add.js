AutoForm.hooks({
  addItemForm: {
      onSuccess: function() {
          $.bootstrapGrowl("Item added successfully.", {
              type: 'success'
          });
          window.scrollTo(0, 0);
      },
      onError: function(form, error) {
          $.bootstrapGrowl("There was an error when trying to insert this item: " + error, {
              type: 'danger',
          });
          window.scrollTo(0, 0);
      }
  }
});

Template.adminItemsAdd.onRendered(function() {
  var languageSelect = $('select[name=language]');
  var adminLang = Session.get('adminSelectedLanguage');
  if (languageSelect && adminLang) {
    languageSelect.val(adminLang);
  }
});

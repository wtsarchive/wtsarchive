var previousValues = {};

AutoForm.hooks({
  addItemForm: {
    beginSubmit: function() {
      previousValues.type = $('select[name=type]').val();
      previousValues.category = $('select[name=category]').val();
      previousValues.language = $('select[name=language]').val();
    },
    onSuccess: function() {
      $.bootstrapGrowl("Item added successfully.", {
        type: 'success'
      });
      window.scrollTo(0, 0);

      $('select[name=language]').val(previousValues.language).trigger('change');
      $('select[name=type]').val(previousValues.type).trigger('change');
      $('select[name=category]').val(previousValues.category).trigger('change');
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

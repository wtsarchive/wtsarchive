var previousValues = {};

AutoForm.hooks({
  addItemForm: {
    beginSubmit: function() {
      Session.set('admin.addItem.type', $('select[name=type]').val());
      Session.set('admin.addItem.category', $('select[name=category]').val());
    },
    onSuccess: function() {
      Router.go('admin.items.list');
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

  var itemType = Session.get('admin.addItem.type');
  var itemCategory = Session.get('admin.addItem.category');
  if (itemType) {
    $('select[name=type]').val(itemType);
    $('select[name=category]').val(itemCategory);
  }
});

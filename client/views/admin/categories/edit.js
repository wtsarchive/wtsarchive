Template.adminCategoriesEdit.helpers({
    category: function() {
        return Categories.findOne(this._id);
    }
});

Template.adminCategoriesEdit.events({
    "click #admin-category-delete": function() {
        var check = confirm("Do you want to delete this category?");
        if (check) {
            Meteor.call("removeCategory", this._id, function() {
                Router.go('admin.categories.list');
            });
        }
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


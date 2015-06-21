Template.adminCategoriesList.helpers({
    categories: function() {
        return Categories.find({language: Session.get("adminSelectedLanguage")}, {sort: {name: 1}});
    }
});


Template.adminCategoriesList.helpers({
    categories: function() {
        return Categories.find({lang: Session.get("adminSelectedLanguage")}, {sort: {name: 1}});
    }
});


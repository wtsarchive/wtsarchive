Template.adminPagesList.helpers({
    articles: function() {
        return Pages.find({language: Session.get("adminSelectedLanguage")}, {sort: {added_on: -1}});
    }
});

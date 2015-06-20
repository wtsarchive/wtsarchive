Template.adminPagesList.helpers({
    articles: function() {
        return Pages.find({lang: Session.get("adminSelectedLanguage")}, {sort: {added_on: -1}});
    }
});

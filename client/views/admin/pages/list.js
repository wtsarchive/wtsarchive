Template.adminPagesList.helpers({
    articles: function() {
        return Pages.find({}, {sort: {added_on: -1}});
    }
});

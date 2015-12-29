Template.sidebarPublications.helpers({
    categories: function() {
        return Categories.find({language: Session.get("language"), type: 'Publication'});
    }
});

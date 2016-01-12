Template.sidebarHome.helpers({
    recents: function() {
        return Items.find({language: Session.get("language")}, {sort: {added_on: -1}, limit: 5});
    }
});

Template.recentsItem.helpers({
    image: function() {
        return Covers.findOne(this.cover);
    },
    date: function() {
        return moment(this.added_on).format("MMMM Do, YYYY");
    }
});

Template.lettersListItem.helpers({
    image: function() {
        return Covers.findOne(this.cover);
    },
    date: function() {
        return moment(this.published_on).format(Session.get("fullDateFormat"));
    }
});

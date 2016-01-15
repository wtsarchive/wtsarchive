Template.pubsListItem.helpers({
    image: function() {
        return Covers.findOne(this.cover);
    }
});

Template.lettersListItem.helpers({
  image: function() {
    return this.coverImage();
  },
  date: function() {
    return moment(this.published_on).format(Session.get("fullDateFormat"));
  }
});

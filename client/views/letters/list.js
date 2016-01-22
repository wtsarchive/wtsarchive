Template.lettersListItem.helpers({
  image: function() {
    return this.coverUrl();
  },
  date: function() {
    return moment(this.published_on).format(Session.get("fullDateFormat"));
  }
});

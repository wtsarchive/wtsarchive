Template.searchBar.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    ItemSearch.search(text, {language: Session.get('language')});
    if (text.length > 1)
      Session.set('search', text);
    else
      Session.set('search', '');
  }, 200)
});

Template.searchResult.helpers({
    image: function() {
        return Covers.findOne(this.cover);
    },
    date: function() {
        return moment(this.published_on).format("MMMM Do, YYYY");
    },
    route: function() {
      if (this.type == "Publication")
        return 'pubs.view';
      else if (this.type == "Letter")
        return 'letters.view';
    }
});


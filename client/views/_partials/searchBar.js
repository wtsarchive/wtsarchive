Template.searchBar.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    ItemSearch.search(text, {language: Session.get('language')});
    Session.set('search', text);
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


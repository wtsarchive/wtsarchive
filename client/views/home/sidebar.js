Template.sidebarHome.onCreated(function() {
    var template = this;
    template.autorun(function() {
        Subs.subscribe('items-recent', Session.get("language"));
    });
});

Template.sidebarHome.helpers({
    recents: function() {
        return Items.find({language: Session.get("language")}, {sort: {added_on: -1}, limit: 5});
    }
});

Template.recentsItem.helpers({
    image: function() {
      return this.coverUrl();
    },
    date: function() {
      return moment(this.published_on).format(Session.get("fullDateFormat"));
    },
    route: function() {
      if (this.type == "Publication")
        return 'pubs.view';
      else if (this.type == "Letter")
        return 'letters.view';
    }
});

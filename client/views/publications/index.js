Template.pubsIndex.onCreated(function() {
    var template = this;
    template.autorun(function() {
        Subs.subscribe('items-recent', Session.get("language"), 'Publication');
    });
});

Template.pubsIndex.helpers({
  items: function() {
    return Items.find({type: "Publication", language: Session.get("language")}, {sort: {added_on: -1}, limit: 20});
  }
});


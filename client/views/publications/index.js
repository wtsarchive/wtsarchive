Template.pubsIndex.helpers({
  items: function() {
    return Items.find({type: "Publication", language: Session.get("language")}, {sort: {added_on: -1}, limit: 20});
  }
});


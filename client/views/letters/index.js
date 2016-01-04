Template.lettersIndex.helpers({
  items: function() {
    return Items.find({type: "Letter", language: Session.get("language")}, {sort: {added_on: -1}, limit: 20});
  }
});

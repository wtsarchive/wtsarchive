Template.lettersIndex.onCreated(function() {
    var template = this;
    template.autorun(function() {
        Subs.subscribe('items-recent', Session.get("language"), 'Letter');
    });
});

Template.lettersIndex.helpers({
  items: function() {
    return Items.find({type: "Letter", language: Session.get("language")}, {sort: {added_on: -1}, limit: 20});
  }
});

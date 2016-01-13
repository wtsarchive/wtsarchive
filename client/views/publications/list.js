Template.pubsList.onRendered(function() {
  var controller = Iron.controller();
  var years = controller.state.get('years');
  Session.set("filterYear", _.keys(years)[0]); 
});

Template.pubsList.helpers({
  notFound: function() {
    var category = Categories.findOne({slug: this.slug});
    return !category && Subscription.ready("categories");
  },
  category: function() {
    if (!Subscription.ready("categories")) return;
    var category = Categories.findOne({slug: this.slug});
    return category;
  },
  items: function() {
    if (!Subscription.ready("categories")) return;
    var category = Categories.findOne({slug: this.slug});

    var start = new Date(Session.get("filterYear"), 0, 1);
    var end = new Date(Session.get("filterYear"), 11, 30);
    return Items.find({category: category._id, language: Session.get("language"), published_on: {$gte: start, $lte: end}});
  },
  years: function() {
    var controller = Iron.controller();
    var years = controller.state.get('years');

    var yearsArray = [];
    var currentYear = Session.get("filterYear");
    _.keys(years).forEach(function(year) {
      yearsArray.push({year: year, selected: currentYear == year});
    });
    return yearsArray;
  }
});

Template.pubsList.events({
    "change #items-year": function(e) {
        var year = $(e.currentTarget).val();
        Session.set("filterYear", year);
    },
});

Template.pubsListItem.helpers({
    image: function() {
        return Covers.findOne(this.cover);
    }
});


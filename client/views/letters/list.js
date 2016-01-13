Template.lettersList.onRendered(function() {
  var controller = Iron.controller();
  var years = controller.state.get('years');
  Session.set("filterYear", _.keys(years)[0]); 
});

Template.lettersList.helpers({
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

    var start = new Date(Session.get("filterYear"), 1, 1);
    var end = new Date(Session.get("filterYear"), 12, 30);
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

Template.lettersList.events({
    "change #items-year": function(e) {
        var year = $(e.currentTarget).val();
        Session.set("filterYear", year);
    },
});

Template.lettersListItem.helpers({
    image: function() {
        return Covers.findOne(this.cover);
    },
    date: function() {
        return moment(this.published_on).format("MMMM Do, YYYY");
    }
});


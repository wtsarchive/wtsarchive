Template.itemsList.onRendered(function() {
  var controller = Iron.controller();
  var years = controller.state.get('years');
  if (years && years[0])
    Session.set("filterYear", years[0].year); 
});

Template.itemsList.helpers({
  notFound: function() {
    if (this.slug) {
      var category = Categories.findOne({slug: this.slug});
      return !category && Subscription.ready("categories");
    }
    return false;
  },
  category: function() {
    if (this.slug) {
      if (!Subscription.ready("categories")) return;
      var category = Categories.findOne({slug: this.slug});
      return category;
    }
    else {
      return {name: __("Tag") + ": " + s.capitalize(this.tag)};
    }
  },
  showFilters: function() {
    return !!this.slug;
  },
  items: function() {
    if (this.slug) {
      if (!Subscription.ready("categories")) return;
      var category = Categories.findOne({slug: this.slug});

      var start = new Date(Session.get("filterYear"), 0, 1);
      var end = new Date(Session.get("filterYear"), 11, 30);
      return Items.find({category: category._id, language: Session.get("language"), published_on: {$gte: start, $lte: end}}, {sort: {published_on: -1}});
    }
    else {
      return Items.find({language: Session.get("language"), tags: this.tag}, {sort: {published_on: -1}}); 
    }
  },
  years: function() {
    var controller = Iron.controller();
    var years = controller.state.get('years');
    var yearsArray = [];

    if (years) {
      var currentYear = Session.get("filterYear");
      years.forEach(function(year) {
        yearsArray.push({year: year.year, selected: currentYear == year.year});
      });
    }
    return yearsArray;
  }
});

Template.itemsList.events({
    "change #items-year": function(e) {
        var year = $(e.currentTarget).val();
        Session.set("filterYear", year);
    },
});

Template.itemsListItem.helpers({
  isPublication: function() {
    return this.type == "Publication";
  }
});

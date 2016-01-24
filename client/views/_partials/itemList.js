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
    var controller = Iron.controller();
    if (this.slug) {
      if (!Subscription.ready("categories")) return;
      var category = Categories.findOne({slug: this.slug});

      var currentYear = controller.params.query.year;
      if (!currentYear || currentYear == 'all') {
        return Items.find({category: category._id, language: Session.get("language")}, {sort: {published_on: -1}});
      }
      else {
        var start = new Date(currentYear, 0, 1);
        var end = new Date(currentYear, 11, 30);
        return Items.find({category: category._id, language: Session.get("language"), published_on: {$gte: start, $lte: end}}, {sort: {published_on: -1}});
      }
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
      var currentYear = controller.params.query.year;
      years.forEach(function(year) {
        yearsArray.push({year: year.year, selected: currentYear == year.year});
      });
    }
    return yearsArray;
  },
  isTagView: function() {
    return !!this.tag;
  }
});

Template.itemsList.events({
  "change #items-year": function(e) {
    var controller = Iron.controller();
    var year = $(e.currentTarget).val();
    Router.go(Router.current().route.getName(), {slug: controller.params.slug}, {query: 'year=' + year});
  },
});

Template.itemsListItem.helpers({
  isPublication: function() {
    return this.type == "Publication";
  }
});

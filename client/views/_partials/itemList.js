Template.itemsList.onCreated(function() {
    var template = this;
    var previousSlug;
    var controller = Iron.controller();
    template.autorun(function() {
      Subs.clear();
        if (Router.current().data().slug) {
            var category = Categories.findOne({slug: Router.current().data().slug});
            setPageTitle(category.type + 's', category.name);
            
            Subs.subscribe('items-category', category._id, {
              lang: Session.get("language"),
              year: Router.current().params.query.year,
              page: Router.current().params.query.page,
              perPage: Router.current().params.query.perPage || ClientConfig.defaultPerPage
            });

            if (previousSlug == Router.current().data().slug) return;
            previousSlug = Router.current().data().slug;
            Meteor.call("itemYearsByCategory", Router.current().data().slug, function(err, res) {
              if (!err)
                controller.state.set('years', res);
            });
        }
        else {
            if (Router.current().data().tag) {
                setPageTitle(s.capitalize(Router.current().data().tag));
                Subs.subscribe('items-tag', Router.current().data().tag, {
                  lang: Session.get("language"),
                  page: Router.current().params.query.page,
                  perPage: Router.current().params.query.page || ClientConfig.defaultPerPage
                });
            }
        }
    });
});

Template.itemsList.helpers({
  notFound: function() {
    if (this.slug) {
      var category = Categories.findOne({slug: this.slug});
      return !category;
    }
    return false;
  },
  category: function() {
    if (this.slug) {
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

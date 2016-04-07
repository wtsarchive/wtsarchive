Meteor.methods({
  itemYearsByCategory: function(categorySlug) {
    var category = Categories.findOne({slug: categorySlug});
    if (!category) return {};

    var results = Items.aggregate([
      {
        $match: {
          category: category._id
        }
      },
      {
        $group : {
          _id : { year: { $year: "$published_on" } },
          count: { $sum: 1 }
        }
      }
    ]);

    var years = [];
    results.forEach(function(result) {
      years.push({year: result._id.year, count: result.count});
    });

    years = _.sortBy(years, 'year').reverse();

    return years;
  },
  itemCount: function(filter) {
    if (filter.category) {
      var category = Categories.findOne({slug: filter.category});
      if (!category) return {};

      return Items.find({category: category._id}).count();
    }
    else if (filter.tag) {
      return Items.find({tags: filter.tag}).count();
    }
  },
  itemView: function(id) {
    Items.update(id, {$inc: {views: 1}});
  },
  pageView: function(id) {
    Pages.update(id, {$inc: {views: 1}});
  }
});

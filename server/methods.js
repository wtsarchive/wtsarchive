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
  }
});

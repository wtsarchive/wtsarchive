var getPageCount = function() {
  var controller = Iron.controller();
  var years = controller.state.get('years');
  var itemCount = _.reduce(years, function(a, b) { return (a.count || a) + b.count;});
  return Math.ceil(itemCount / controller.state.get('perPage'));
};

Template.itemPager.helpers({
  previous: function() {
    var controller = Iron.controller();
    var query = controller.params.query;
    var currentPage = parseInt(query.page || 1);
    if (currentPage - 1 > 0)
      return currentPage - 1;
    else
      return false;
  },
  next: function() {
    var controller = Iron.controller();
    var query = controller.params.query;
    var currentPage = parseInt(query.page || 1);
    var max = getPageCount();
    if (currentPage + 1 <= max) 
      return currentPage + 1;
    else 
      return false;
  },
  show: function() {
    return getPageCount() > 1;
  },
  pages: function() {
    var controller = Iron.controller();
    var query = controller.params.query;
    var currentPage = parseInt(query.page) || 1;
    var max = getPageCount();
    var margin = 2;
    var pages = [];
    for (var page = Math.max(1, currentPage - margin); page <= Math.min(max, currentPage + margin); page++) {
      pages.push({page: page, active: page == currentPage});
    }
    return pages;
  }
});

Template.itemPager.events({
  'click .paginate_button': function(e) {
    e.preventDefault();

    var controller = Iron.controller();
    var query = controller.params.query;
    var button = $(e.target);
    if (button.parent().hasClass("disabled"))
      return;

    query.page = button.data('dt-idx');

    Router.go(Router.current().route.getName(), controller.params, {query: $.param(query)});
  }
});

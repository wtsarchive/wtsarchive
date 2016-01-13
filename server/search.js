SearchSource.defineSource('items', function(searchText, options) {
  if(searchText) {
    var regExp = buildRegExp(searchText);
    
    var plainResults = Items.find({
      $or: [
        {title: regExp},
        {code: searchText}
      ]
    }).fetch();

    var fullTextResults = Items.find({
      $text: {$search: searchText}
    }, {
      fields: {
        score: { $meta: "textScore" }
      },
      sort: {
        score: { $meta: "textScore" }
      }
    }).fetch();

    return plainResults.concat(fullTextResults);
  } else {
    return [];
  }
});

function buildRegExp(searchText) {
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}

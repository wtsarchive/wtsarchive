SearchSource.defineSource('items', function(searchText, options) {
  if(searchText) {
    // Search by publication code
    if (/[a-zA-Z0-9_]+-[a-zA-Z]{1,2}$/.test(searchText)) {
      return Items.find({
        code: searchText
      }).fetch();
    }

    var regExp = buildRegExp(searchText);
    
    var plainResults = Items.find({
      $or: [
        {title: regExp},
        {normalizedCode: searchText}
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

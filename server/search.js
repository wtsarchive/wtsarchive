SearchSource.defineSource('items', function(searchText, options) {
  if(searchText && searchText.trim().length > 1) {
    // Search by publication code
    if (/[a-zA-Z0-9_]+-[a-zA-Z]{1,2}$/.test(searchText)) {
      return Items.find({
        code: codeRegExp(searchText)
      }).fetch();
    }

    var plainResults = Items.find({
      $or: [
        {title: titleRegExp(searchText)},
        {tags: titleRegExp(searchText)},
        {normalizedCode: codeRegExp(searchText)}
      ],
      language: options.language
    }).fetch();

    var fullTextResults = Items.find({
      $text: {$search: searchText},
      language: options.language
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

function titleRegExp(searchText) {
  var parts = searchText.trim().split(/[ \:]+/);
  parts = _.filter(parts, function(part) { return part.length > 1; });
  return new RegExp("(" + parts.join('|') + ")", "ig");
}

function codeRegExp(searchText) {
  return new RegExp(searchText, "ig");
}

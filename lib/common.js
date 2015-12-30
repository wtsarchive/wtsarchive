/*
 * lib/common.js
 * Global utility methods for both client and server
 */

// Returning a translated string
__ = function(id, args) {
    var string = Strings.findOne({id: SHA256(id).slice(32)});
    if (!string) {
      setTimeout(function() {
        Meteor.call("addString", id);
      }, 1000);
    }

    var result = string ? string.text : id;

    // I18n support
    if (Meteor.isClient && Session.get("language")) {
        var lang = Session.get("language");
        if (typeof(string) != "undefined") {
            var localized = _.find(string.i18n, function(s) { return s.language == lang; });
            if (localized && localized.text) {
                result = localized.text;
            }
        }
    }

    if (typeof(args) != "undefined" && args.length > 0) {
        result = s.sprintf.apply(null, [result].concat(args));
    }

    return result;
};

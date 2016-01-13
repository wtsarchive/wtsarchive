var updateDateFormats = function() {
  var lang = Session.get("language");

  moment.locale(lang);
  if (lang == "en") {
    Session.set("fullDateFormat", "MMMM Do, YYYY");
  }
  else if (lang == "pl") {
    Session.set("fullDateFormat", "D MMMM YYYY");
  }
};

Template.languagePicker.rendered = function() {
  if (!Session.get("language"))
    Session.set("language", ClientConfig.defaultLanguage);

  updateDateFormats();
};

Template.languagePicker.events({
  "click button": function(e) {
    var lang = $(e.target).data("lang-code");
    Session.set("language", lang);
    updateDateFormats();
  }
});

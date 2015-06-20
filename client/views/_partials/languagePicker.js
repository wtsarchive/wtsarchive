Template.languagePicker.rendered = function() {
    if (!Session.get("language"))
        Session.set("language", ClientConfig.defaultLanguage);
};

Template.languagePicker.events({
    "click button": function(e) {
        var lang = $(e.target).data("lang-code");
        Session.set("language", lang);
    }
});

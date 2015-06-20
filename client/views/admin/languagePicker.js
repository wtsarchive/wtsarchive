Template.adminLanguagePicker.rendered = function() {
    if (!Session.get("adminSelectedLanguage"))
        Session.set("adminSelectedLanguage", ClientConfig.defaultLanguage);
};

Template.adminLanguagePicker.events({
    "click button": function(e) {
        var lang = $(e.target).data("lang-code");
        Session.set("adminSelectedLanguage", lang);
    }
});

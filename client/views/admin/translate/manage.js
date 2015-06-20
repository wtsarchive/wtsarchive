var filter = {
    dep: new Deps.Dependency(),
    content: ""
};

Template.adminStringsManage.rendered = function() {
    filter.content = "";
    filter.dep.changed();
};

Template.adminStringsManage.helpers({
    strings: function() {
        var strings = Strings.find({}, {sort: {text_sort: 1}}).fetch();
        filter.dep.depend();
        if (filter.content !== "") {
            strings = _.filter(strings, function(string) {
                return string.text.toLowerCase().indexOf(filter.content) !== -1;
            });
        }
        strings.forEach(function(string) {
            string.text = s.prune(string.text, 120);
        });
        return strings;
    }
});

Template.adminStringsManage.events({
    'keyup #content-filter-text': function(event) {
        filter.content = $(event.target).val().toLowerCase();
        filter.dep.changed();
    }
});

Template.adminStringsEdit.helpers({
    text: function() {
        var id = this._id;
        return Strings.findOne(id).text;
    },
    localizedStrings: function() {
        var id = this._id;
        var string = Strings.findOne(id);
        var languages = Languages.find().fetch();
        var locales = [];
        languages.forEach(function(language) {
            if (language.code != ClientConfig.defaultLanguage) {
                locales.push({
                    language: language,
                    translation: _.find(string.i18n, function(s) { return s.language == language.code; })
                });
            }
        });
        return locales;
    }
});

Template.adminStringsEdit.events({
    'click .save-btn': function(event) {
        var id = this._id;
        var content = $('#content-edit-text').val();
        if (!content) {
            alert("Please enter text value.");
            return;
        }
        var i18n = [];
        $('.content-edit-text-localized').each(function(index, textarea) {
            var language = $(textarea).data('language');
            var text = $(textarea).val();
            i18n.push({
                language: language,
                text: text
            });
        });
        Meteor.call("updateString", id, content, i18n, function(err) {
            if (err) alert(err.reason);
            
            Router.go('admin.strings.manage');
        });
    }
});

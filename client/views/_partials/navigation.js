Template.navigationLinks.helpers({
    active: function(item) {
        return (Router.current().route.getName() == item) ? "active" : "";
    }
});

Template.navigation.events({
    "click .navbar-toggle": function() {
        $('#sidebar').toggle("fast");
        $('#sidebar').toggleClass("on");
    }
});

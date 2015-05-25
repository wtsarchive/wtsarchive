Template.navigationLinks.helpers({
    active: function(item) {
        return (Router.current().route.getName().indexOf(item) === 0) ? "active" : "";
    }
});

Template.navigation.events({
    "click .navbar-toggle": function() {
        $('#sidebar').toggle("fast");
        $('#sidebar').toggleClass("on");
    }
});

Template.navigation.helpers({
    active: function(item) {
        return (Router.current().route.getName() == item) ? "active" : "";
    }
});

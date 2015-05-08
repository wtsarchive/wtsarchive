Template.layout.helpers({
    sidebarTemplate: function() {
        var currentRoute = Router.current().route.getName();

        // Default sidebar template
        return "sidebarHome";
    }
});

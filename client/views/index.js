Template.layout.helpers({
    sidebarTemplate: function() {
        var currentRoute = Router.current().route.getName();

        // Admin sidebar
        if (currentRoute.indexOf("admin") === 0)
            return "sidebarAdmin";

        // Default sidebar template
        return "sidebarHome";
    }
});

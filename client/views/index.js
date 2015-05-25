Template.layout.helpers({
    sidebarTemplate: function() {
        var currentRoute = Router.current().route.getName();

        // Publications sidebar 
        if (currentRoute.indexOf("pubs") === 0)
            return "sidebarPublications";

        // Letters sidebar 
        if (currentRoute.indexOf("letters") === 0)
            return "sidebarLetters";

        // Admin sidebar
        if (currentRoute.indexOf("admin") === 0)
            return "sidebarAdmin";

        // Default sidebar template
        return "sidebarHome";
    }
});

Template.layout.events({
    "touchend #content": function() {
        if ($('#sidebar').hasClass("on")) {
            $('#sidebar').toggle('fast');
            $('#sidebar').toggleClass('on');
        }
    }
});

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

        // Tags sidebar (search only)
        if (currentRoute.indexOf("tag") === 0)
            return "sidebarPlain";

        // Default sidbar template
        return "sidebarHome";
    },
    searchResults: function() {
      return ItemSearch.getData({
        transform: function(matchText, regExp) {
          return matchText.replace(regExp, "<b>$&</b>")
        },
        sort: {isoScore: -1}
      });
    },
    isSearching: function() {
      return ItemSearch.getStatus().loading;
    },
    search: function() {
      return Session.get('search');
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

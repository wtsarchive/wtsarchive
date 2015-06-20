Validate = {
    loggedIn: function() {
        if (!Meteor.userId()) {
            throw new Meteor.Error("You have to be logged in.");
        }
        return true;
    },
    userMatch: function(userId) {
        if (!this.loggedIn() || userId !== Meteor.userId()) {
            throw new Meteor.Error("User ID mismatch.");
        }
    },
    isAdmin: function() {
        if (!this.loggedIn() || !Roles.userIsInRole(Meteor.user(), ['admin'])) {
            throw new Meteor.Error("You don't have permission to do this.");
        }
    }
};

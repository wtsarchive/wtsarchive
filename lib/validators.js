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
    isAdmin: function(userId) {
      var user;
      if (userId) user = Meteor.users.findOne(userId);
      else user = Meteor.user();

      if (!user || !Roles.userIsInRole(user, ['admin'])) {
        throw new Meteor.Error("You don't have permission to do this.");
      }

      return true;
    }
};

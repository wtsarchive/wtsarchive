Template.sidebarAdmin.helpers({
  itemsTypes: function() {
    return ItemTypes;
  },
  showItemsTypes: function() {
    return Router.current().route.getName() == "admin.items.list";
  }
});

Template.adminSidebarTypeItem.helpers({
  active: function() {
    return this == Session.get("adminItemsType");
  }
});

Template.sidebarAdmin.events({
  'click .items-types a' :function(e) {
    Session.set("adminItemsType", $(e.target).data('type'));
  }
});

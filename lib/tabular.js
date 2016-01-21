TabularTables = {};

TabularTables.AdminItems = new Tabular.Table({
  name: "AdminItems",
  collection: Items,
  responsive: true,
  autoWidth: false,
  extraFields: ['cover'],
  columns: [
    {
      tmpl: Meteor.isClient && Template.adminItemsCellImage
    },
    {data: "title", title: "Title"},
    {
      data: "category", 
      title: "Category",
      render: function (val) {
        var category = Categories.findOne(val);
        return category.name;
      }
    },
    {
      data: "published_on", 
      title: "Pub.&nbsp;date",
      render: function (val) {
        return moment(val).calendar();
      }
    },
    {
      tmpl: Meteor.isClient && Template.adminItemsCellActions,
    }
  ]
});

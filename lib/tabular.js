TabularTables = {};

TabularTables.AdminItems = new Tabular.Table({
  name: "AdminItems",
  collection: Items,
  responsive: true,
  autoWidth: false,
  extraFields: ['cover'],
  order: [[4, 'desc']],
  columns: [
    {
      tmpl: Meteor.isClient && Template.adminItemsCellImage
    },
    {
      data: "title", 
      title: "Title",
    },
    {
      data: "code", 
      title: "Code",
    },
    {
      data: "category", 
      title: "Category",
      render: function (val) {
        var category = Categories.findOne(val);
        return category.name;
      }
    },
    {
      data: "added_on", 
      title: "Added on",
      visible: false
    },
    {
      data: "published_on", 
      title: "Pub.&nbsp;date",
      render: function (val) {
        return moment(val).format('YYYY-MM-DD');
      }
    },
    {
      tmpl: Meteor.isClient && Template.adminItemsCellActions,
    }
  ]
});

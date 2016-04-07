Template.article.onCreated(function() {
  var template = this;
  var page, lastPage;
  template.autorun(function() {
    if (template.data.identifier)
      page = Page.getByIdentifier(template.data.identifier, true);
    else
      page = Page.getBySlug(template.data.slug, true);

    if (page && lastPage != page._id) {
      Meteor.call("pageView", page._id);
      lastPage = page._id;
    }
  });
});

Template.article.helpers({
  content: function() {
    if (this.identifier)
      return Page.getByIdentifier(this.identifier);
    else
      return Page.getBySlug(this.slug);
  }
});

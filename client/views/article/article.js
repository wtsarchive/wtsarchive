Template.article.helpers({
    content: function() {
        if (this.identifier)
            return Page.getByIdentifier(this.identifier);
        else
            return Page.getBySlug(this.slug);
    }
});

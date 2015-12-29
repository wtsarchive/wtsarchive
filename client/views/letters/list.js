Template.lettersList.helpers({
    notFound: function() {
        var category = Categories.findOne({slug: this.slug});
        return !category && Subscription.ready("categories");
    },
    category: function() {
        var category = Categories.findOne({slug: this.slug});
        return category.name;
    }
});

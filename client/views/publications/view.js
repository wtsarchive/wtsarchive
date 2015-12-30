Template.pubsView.onCreated(function () {
    var instance = this;
    this.autorun(function() {
        instance.subscribe('items-code', instance.data.code);
    });
});

Template.pubsView.helpers({
  notFound: function() {
    var item = Items.findOne({code: this.code});
    return !item;
  },
  item: function() {
    var item = Items.findOne({code: this.code});
    return item;
  }
});

function fileSize(a,b,c,d,e){
 return (b=Math,c=b.log,d=1024,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)+' '+(e?'kMGTPEZY'[--e]+'B':'Bytes');
}

Template.pubsViewFile.helpers({
  size: function() {
    return fileSize(this.filesize);
  }
});

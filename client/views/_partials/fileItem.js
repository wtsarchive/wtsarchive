Template.fileItem.helpers({
  size: function() {
    return fileSize(this.filesize);
  },
  icon: function() {
    var icons = {
      PDF: "fa-file-pdf-o",
      Image: "fa-file-image-o",
      Movie: "fa-file-video-o"
    };
    return icons[this.type];
  }
});

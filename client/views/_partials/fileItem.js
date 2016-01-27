Template.fileItem.helpers({
  size: function() {
    return fileSize(this.filesize);
  },
  icon: function() {
    var icons = {
      PDF: "fa-file-pdf-o",
      Image: "fa-file-image-o",
      Movie: "fa-file-video-o",
      Archive: "fa-file-archive-o",
      Audio: "fa-file-audio-o"
    };
    return icons[this.type];
  },
  isExternal: function() {
    return this.url.indexOf("http") === 0;
  }
});

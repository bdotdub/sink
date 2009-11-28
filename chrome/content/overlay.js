var bwongsink = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("bwongsink-strings");
  },

  onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                this.strings.getString("helloMessage"));
    alert('hi');
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    bwongsink.onMenuItemCommand(e);
  }
};

window.addEventListener("load", bwongsink.onLoad, false);

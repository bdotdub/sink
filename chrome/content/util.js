if (typeof(bwongsink) == 'undefined') {
  bwongsink = {};
}

bwongsink.util = {
  prefManager: null,

  clearInputFieldById: function(field_id) {
    document.getElementById(field_id).value = '';
  },

  getPref: function(pref) {
    var prefManager = bwongsink.util.getPrefManager();
    return prefManager.getCharPref(pref);
  },

  getPrefManager: function() {
    if (bwongsink.util.prefManager == null)
      bwongsink.util.prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    return bwongsink.util.prefManager;
  },

  hideElementById: function(element_id) {
    document.getElementById(element_id).className = 'hide';
  },

  showElementById: function(element_id) {
    document.getElementById(element_id).className = '';
  },

  setPref: function(pref, value) {
    var prefManager = bwongsink.util.getPrefManager();
    prefManager.setCharPref(pref, value);
  }
}


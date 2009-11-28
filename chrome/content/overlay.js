var bwongsink = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("bwongsink-strings");
  },

  sinkTabs: function() {
    var windows = [];

    var windowMediator = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
    var windowEnumerator = windowMediator.getEnumerator('navigator:browser');

    while (windowEnumerator.hasMoreElements()) {
      var tabs = []

      var browserWindow = windowEnumerator.getNext();
      var tabBrowser    = browserWindow.getBrowser();

      for (var idx = 0; idx < tabBrowser.browsers.length; ++idx) {
        var tab = tabBrowser.getBrowserAtIndex(idx);
        tabs.push({
          'selected'  : (tabBrowser.selectedTab == tabBrowser.mTabs[idx]),
          'title'     : tab.contentTitle,
          'uri'       : tab.currentURI.spec
        });
      }
      windows.push(tabs);
    }

    bwongsink.server.sync(windows);
  }
};

bwongsink.logging = {
  debug: function(msg) {

  },

  error: function(msg) {

  },

  info: function(msg) {

  }
}

bwongsink.server = {
  fullUrl: "http://localhost/bwong/test.php",
  httpRequest: null,

  requestLoaded: function() {
    bwongsink.logging.info(bwongsink.server.httpRequest.responseText);
  },

  serialize: function(windows) {
    var paramsData = [];
    for (var winIdx = 0; winIdx < windows.length; ++winIdx) {
      var tabs = windows[winIdx];
      for (var tabIdx = 0; tabIdx < tabs.length; ++tabIdx) {
        paramsData.push(bwongsink.server.serializedStringForAttribute(tabs, 'selected', winIdx, tabIdx));
        paramsData.push(bwongsink.server.serializedStringForAttribute(tabs, 'title', winIdx, tabIdx));
        paramsData.push(bwongsink.server.serializedStringForAttribute(tabs, 'uri', winIdx, tabIdx));
      }
    }

    return paramsData.join('&')
  },

  serializedStringForAttribute: function(tabs, attribute, winIdx, tabIdx) {
    var key = 'window_' + winIdx + '_tab_' + tabIdx + '_' + attribute;
    var serializedString = key + "=" + escape(tabs[tabIdx][attribute]);
    return serializedString;
  },

  sync: function(windows) {
    var serializedParams = bwongsink.server.serialize(windows);
    bwongsink.server.httpRequest = new XMLHttpRequest();

    bwongsink.server.httpRequest.open("POST", bwongsink.server.fullUrl, true);
    bwongsink.server.httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

    bwongsink.server.httpRequest.onload = bwongsink.server.requestLoaded;
    bwongsink.server.httpRequest.send(serializedParams);
  }
}

window.addEventListener("load", bwongsink.onLoad, false);


net.bwong.sink.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ net.bwong.sink.showFirefoxContextMenu(e); }, false);
};

net.bwong.sink.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-net.bwong.sink").hidden = gContextMenu.onImage;
};

window.addEventListener("load", net.bwong.sink.onFirefoxLoad, false);

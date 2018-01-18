(function() {
  // iffy might not be needed, adding as a general practice
  // create a context menu object, to be used later to initialize our context menu option
  const contextMenuItem = {
    id: "goread",
    title: "I read this today!",
    contexts: ["all"]
  }

  // context menu handler
  const handleContextMenus = (data) => {
    if(data.menuItemId==='goread' && data.pageUrl) {
      // here we get our url to be saved, can play with this now
      const rawUrl=data.pageUrl;
    }
  }

  // initialize the app here, make function calls and adding event listeners
  const initialiseApp = () => {
    chrome.contextMenus.create(contextMenuItem);
    chrome.contextMenus.onClicked.addListener(function (clickData) {
      handleContextMenus(clickData);
    });
  }

  initialiseApp();
})();
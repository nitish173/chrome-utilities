import { idGenerator } from "./globalUtils";
import { urlObject } from "./dsUtils";

(function() {
  // iffy might not be needed, adding as a general practice
  // create a context menu object, to be used later to initialize our context menu option
  const contextMenuItem = {
    id: "goread",
    title: "I read this today!",
    contexts: ["all"]
  }

  const prepareUrlObject = (url) => {
    const newUrlObject = Object.assign(urlObject(), {
      id: idGenerator(),
      url: url,
    });
    return newUrlObject;
  }

  // context menu handler
  const handleContextMenus = (data) => {
    if(data.menuItemId==='goread' && data.pageUrl) {
      // here we get our url to be saved, can play with this now
      const rawUrl=data.pageUrl;
      console.log(prepareUrlObject(rawUrl));
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
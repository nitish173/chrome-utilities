// utils
import { idGenerator,
  isUniqueUrl } from "./globalUtils";
import { urlObject } from "./dsUtils";

(function() {
  // create a context menu object, to be used later to initialize our context menu option
  const contextMenuItem = {
    id: "goread",
    title: "I read this today!",
    contexts: ["all"]
  };

  // initializes local db based on chrome storage api, then initialises rest of the app
  const initialiseSyncDB = (appSetter) => {
    chrome.storage.sync.set({'urlList' : []}, function() {
      appSetter();
    });
  };

  // this function initialises app other than the DB
  const appSetter = () => {
    chrome.contextMenus.create(contextMenuItem);
    chrome.contextMenus.onClicked.addListener(function (clickData) {
      handleContextMenus(clickData);
    });
  };

  // function to generate a data object with 5 fields : id, url, rating, time spent, timestamp
  const prepareUrlObject = (url) => {
    const newUrlObject = Object.assign(urlObject(), {
      id: idGenerator(),
      url: url,
    });
    return newUrlObject;
  };



  // context menu handler
  const handleContextMenus = (data) => {
    if(data.menuItemId==='goread' && data.pageUrl) {
      // here we get our url to be saved, can play with this now
      const rawUrl=data.pageUrl;
      const newEntry = prepareUrlObject(rawUrl);
      try {
        // save the entry by pushing into existing db, not considering uniqueness of url
        chrome.storage.sync.get('urlList', function(storage) {
          let currentList = storage.urlList;
          if(isUniqueUrl(rawUrl, currentList)) {
            currentList.push(newEntry);
            chrome.storage.sync.set({
              'urlList': currentList
            });
          }
        });
      } catch (error) {
        // silently fail without lettign users know with a log, bad ux otherwise?
        console.log(error);
      }
      // console.log(prepareUrlObject(rawUrl));
    }
  };

  // initialize the app here, make function calls and adding event listeners
  const initialiseApp = () => {
    // initialises db, rest of the initialisation is handled by intialiseSyncDB in the callback
    initialiseSyncDB(appSetter);
  };

  initialiseApp();
})();
// add all the global utility functions here

// generates ~unique ids based on random number and format regex
export const idGenerator = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// checks if the new incoming url is unique in the db and returns boolean answer
export const isUniqueUrl = (currentUrl, currentListObject) => {
  // to be implemented
  return true;
};
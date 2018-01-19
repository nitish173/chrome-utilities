// define data structures creators here

// a data structure for the new url entry
export const urlObject = () => {
  return {
    id: null,
    url: '',
    rating: 0,
    timeSpent: 0,
    timestamp: new Date()
  }
};

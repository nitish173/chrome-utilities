
var sidebarSelector = null, count = 0;

var timer = setInterval(function checkForsidebar() {
  if (!sidebarSelector && count < 10) {
    sidebarSelector = document.querySelector('#related');
  } else {
    sidebarSelector.style.maxHeight = '100vh';
    sidebarSelector.style.overflowY = 'scroll';
    clearInterval(timer);
  }
  count++;
}, 1000);

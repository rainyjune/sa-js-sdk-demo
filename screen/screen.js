var elements = document.querySelectorAll('[id]');

elements.forEach(function(element) {
  element.innerHTML = getGlobalVarFromStr(element.id);
});

document.querySelector('[data-myid="screenWidth"]').innerHTML = window.screen.width * window.devicePixelRatio;
document.querySelector('[data-myid="screenHeight"]').innerHTML = window.screen.height * window.devicePixelRatio;

function getGlobalVarFromStr(str) {
  var currentVar = window;
  var arr = str.split('.');
  while(arr.length) {
    currentVar = currentVar[arr.shift()];
  }
  return currentVar;
}
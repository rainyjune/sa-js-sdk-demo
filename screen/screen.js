var elements = document.querySelectorAll('[id]');

for (var i = elements.length - 1; i >= 0; i--) {
  var element = elements[i];
  element.innerHTML = getGlobalVarFromStr(element.id);
}

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
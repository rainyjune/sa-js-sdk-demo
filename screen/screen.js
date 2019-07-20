var elements = document.querySelectorAll('[id]');

elements.forEach(function(element) {
  element.innerHTML = getGlobalVarFromStr(element.id);
});

function getGlobalVarFromStr(str) {
  var currentVar = window;
  var arr = str.split('.');
  while(arr.length) {
    currentVar = currentVar[arr.shift()];
  }
  return currentVar;
}
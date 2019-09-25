var elements = ["screen.width", "innerWidth", "document.body.clientWidth", "document.documentElement.clientWidth", "outerWidth", "document.documentElement.scrollWidth", "document.documentElement.offsetWidth", "document.body.scrollWidth", "document.body.offsetWidth", "screen.height", "innerHeight", "document.body.clientHeight", "document.documentElement.clientHeight", "outerHeight", "document.documentElement.scrollHeight", "document.documentElement.offsetHeight", "document.body.scrollHeight", "document.body.offsetHeight", "devicePixelRatio", "pageYOffset", "document.body.scrollTop", "document.documentElement.scrollTop"];

var scrollArr = ["scrollY", "pageYOffset", "document.body.scrollTop", "document.documentElement.scrollTop"];

function updateAllData(arr) {
  arr = arr || elements;
  for (var i = arr.length - 1; i >= 0; i--) {
    var element = document.getElementById(arr[i]);
    var val = getGlobalVarFromStr(element.id);
    element.innerHTML = isNaN(val) ? 'undefined' : val;
  }
}

updateAllData();

var myDevicePixelRatio = (isNaN(window.devicePixelRatio) ? 1 : window.devicePixelRatio);

document.getElementById("screenWidth").innerHTML = window.screen.width * myDevicePixelRatio;
document.getElementById("screenHeight").innerHTML = window.screen.height * myDevicePixelRatio;

function getGlobalVarFromStr(str) {
  var currentVar = window;
  var arr = str.split('.');
  while(arr.length) {
    currentVar = currentVar[arr.shift()];
  }
  return currentVar;
}

window.onscroll = function (event) {
  updateAllData(scrollArr);
};


window.onresize = function(event) {
  updateAllData();
};
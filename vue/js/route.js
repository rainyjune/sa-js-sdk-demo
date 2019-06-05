(function(exports, Vue, VueRouter) {
  'use strict';

  var routes = [];

  var router = new VueRouter({
    routes: routes
  });

  //vue 项目在路由切换的时候调用
  router.afterEach(function (to, from) {
    Vue.nextTick(() => {
      sensors.quick("autoTrackSinglePage");
    });
  });

  exports.router = router;
  // 现在，应用已经启动了！

})(window, Vue, VueRouter)

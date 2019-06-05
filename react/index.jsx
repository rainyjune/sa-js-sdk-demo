import React from "react";
import ReactDOM from "react-dom";
import "reboot.css";
import App from "./src/App";

// 引入 SDK
import sensors from'sa-sdk-javascript';

// 初始化
sensors.init({
  //SDK版本1.12.18以上支持，默认值为false
  is_track_single_page: true,
  server_url: '//test-syg.datasink.sensorsdata.cn/sa?token=27f1e21b78daf376&project=lixiang', // 这里填写您自己的神策后台地址
  heatmap: {}
});

//注意默认的： sensors.quick('autoTrack') 是需要的
sensors.quick('autoTrack');


ReactDOM.render(<App />, document.getElementById("app"));

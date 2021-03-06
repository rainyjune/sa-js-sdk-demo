import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Home from './components/home';
import About from './components/about';
import Topics from './components/topics';

import './App.css';

// 引入 SDK
import sensors from'sa-sdk-javascript';

// 配置参数
sensors.init({
  server_url: '//test-syg.datasink.sensorsdata.cn/sa?token=27f1e21b78daf376&project=lixiang',
  heatmap: {}
});

class BasicExample extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route component={App} />
      </BrowserRouter>
    );
  }
}

class App extends React.Component {
  componentWillMount() {
    const { history } = this.props;
    this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    this.handleLocationChange(history.location);
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  handleLocationChange = (location) => {
    // 路由变化时执行 sensors.quick("autoTrackSinglePage");
    console.log('changed:', location);

    // 发送数据之前设置标题
    switch(location.pathname) {
      case "/topics":
        document.title = "Topics";
        break;
      case "/about":
        document.title = "About";
        break;
      default:
        document.title = 'Home';
        break;
    }
    sensors.quick("autoTrackSinglePage");
  }

  render() {
    // Render the rest of the application with its routes
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    );
  }
}



export default BasicExample;

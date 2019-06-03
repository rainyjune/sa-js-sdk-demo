import React from 'react';
import './App.css';

// 引入 SDK
import sensors from'sa-sdk-javascript';

// 初始化
sensors.init({
  //SDK版本1.12.18以上支持，默认值为false
  is_track_single_page: true,
  server_url: '//test-syg.datasink.sensorsdata.cn/sa?token=27f1e21b78daf376&project=lixiang',
  heatmap: {}
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: 'index.html' };
    this.visit = this.visit.bind(this);
  }
  visit(e) {
    e.preventDefault();
    const target = e.target,
      title = target.innerHTML;

    this.setState({
      content: title
    });
    document.title = title;
    window.history.pushState(null, title, 'index.html?q=' + title);
  }
  componentDidMount() {
    //注意默认的： sensors.quick('autoTrack') 是需要的
    sensors.quick('autoTrack');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>visit:
            <ul>
              <li><a onClick={this.visit} href="about.html">about.html</a></li>
              <li><a onClick={this.visit} href="topic.html">topic.html</a></li>
              <li><a onClick={this.visit} href="address.html">address.html</a></li>
            </ul>
          </div>
          <div id="content">
            {this.state.content}
          </div>
        </header>
      </div>
    );
  }
}

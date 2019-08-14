/**
 * 不匹配的路由
 */
import React from 'react';

import Svg404 from '../assets/images/404.svg';

class NoMatch extends React.Component {
  constructor() {
    super();
    
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="f-vhc" style={{ height: 'calc(100vh - 160px)', }}>
        <img className="mr120" src={Svg404}></img>
        <div>
          <h2 className="no-match__title">404</h2>
          <p className="no-match__sub-text">抱歉，你访问的页面不存在</p>
        </div>
      </div>
    );
  }
}

export default NoMatch;
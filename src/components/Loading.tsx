/**
 * 按需加载，加载中效果
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Spin, } from 'antd';

class Loading extends React.Component<any, any> {
  static defaultProps = {
    spinning: false,
    tip: '',
  }

  static propTypes = {
    spinning: PropTypes.bool,
    tip: PropTypes.string,
  }; 

  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className={`f-vhc ${this.props.spinning ? '' : 'display-none'}`} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'rgba(255, 255, 255, 0.5)'}}>
        <Spin size="large" spinning={true} tip={this.props.tip} />
      </div>
    );
  }
}

export default Loading;
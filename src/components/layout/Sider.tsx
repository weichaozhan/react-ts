import React from 'react';
import { Layout, Icon, } from 'antd';

import styles from './layout.module.less';

const { Sider, } = Layout;

interface IProps {
  className: string;
}

class AppSider extends React.Component<IProps, any> {
  public render() {
    const { className, } = this.props;

    return (
      <Sider className={`${styles['layout-sider']} ${className} pos-r`}>
        <div className="logo--header">
          <div>
            <span className={styles['logo-title']}></span>
          </div>
        </div>
      </Sider>
    );
  }
}

export default AppSider;
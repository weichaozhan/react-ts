import React from 'react';
import { Layout, Dropdown, Menu, } from 'antd';

import styles from './layout.module.less';

const MenuItem = Menu.Item;
const { Header, } = Layout;

class AppHeader extends React.Component {
  public render() {
    return (
      <Header className={styles['header']} >
        <Dropdown overlay={
          <Menu>
            <MenuItem key="1">
              <span>退出</span>
            </MenuItem>
          </Menu>
        } trigger={['click']}>
          <div className={styles['head__user-msg']}>
            <div className={styles['head-img']}>
            </div>
            <span>admin</span>
          </div>
        </Dropdown>
      </Header>
    );
  }
}

export default AppHeader;
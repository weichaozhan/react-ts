import React from 'react';
import { connect, } from 'react-redux';
import { withRouter, RouteComponentProps, } from 'react-router-dom';
import { Layout, Icon, } from 'antd';

import styles from './layout.module.less';

import * as menuAction from '../../store/actions/menuAction';

import Nav from '../nav/Index';

const { Sider, } = Layout;

interface IProps extends RouteComponentProps {
  className: string;
  menu?: StoreReduxMenu.IState;
  changeCollaps?: Function;
}

class AppSider extends React.Component<IProps, any> {
  public changeCollaps() {
    const preCollapsed = (this.props.menu as StoreReduxMenu.IState).collapsed;

    (this.props.changeCollaps as Function)(!preCollapsed);
  }

  public render() {
    const { className, menu, } = this.props;

    return (
      <Sider className={`${styles['layout-sider']} ${className} pos-r`} collapsed={(menu as StoreReduxMenu.IState).collapsed} >
        <div className={styles['logo--header']}>
          <div>
            <span className={styles['logo-title']}></span>
          </div>
        </div>
        <Nav />
        <div className={styles['sider-collapse-controller']} onClick={this.changeCollaps.bind(this)}>
          <Icon type="menu" />
        </div>
      </Sider>
    );
  }
}

/**
 * @description action 作为 props 绑定
 * @param {Function} dispatch dispatch
 */
const mapDispatchToProps = (dispatch: Function,) => {
  return {
    changeCollaps: (collapsChange: boolean) => dispatch(menuAction.changeCollaps(collapsChange)),
  };
};

/**
 * @description 绑定 store 到props
 * @param {Object} state store
 */
const mapStateToProps = (state: any,) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(withRouter(AppSider));
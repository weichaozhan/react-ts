import React from 'react';
import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import { Layout, Spin, message, } from 'antd';

import styles from './layout.module.less';

import AppHeader from './Header';
import AppSider from './Sider';

import * as toolsAction from '../../store/actions/toolsAction';
import * as userAction from '../../store/actions/userAction';

import {
  getUserMsgAPI,
  getUserAuthAPI,
} from '../../api/global';

const { Content, } = Layout;

class MainLayout extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  public componentDidMount() {
    this.getAppMsg();
  }

  public async getAppMsg() {
    this.props.changeLoading(true);
    
    await Promise.all([this.getUserMsg(), this.getUserAuth()])
      .then(res => {
        this.props.setUserMsg({
          ...res[0],
          ...res[1],
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.props.changeLoading(false);
      });
  }

  public getUserMsg() {
    return getUserMsgAPI()
      .then((res: any) => {
        if (res.success) {
          return res.data;
        } else {
          message.error(res.errorMsg);
          return this.props.user.userMsg;
        }
      });
  }

  public getUserAuth() {
    return getUserAuthAPI()
      .then((res: any) => {
        if (res.success) {
          return {
            auth: res.data,
          };
        } else {
          message.error(res.errorMsg);
          return this.props.user.userMsg;
        }
      });
  }

  public render() {
    return (
      <Spin className={styles['loading--app']} spinning={this.props.tools.loading} tip="加载中..." >
        <Layout>
          <AppSider className="h-vh100" />
          <Layout>
            <AppHeader />
            <Content className={styles['layout-content']}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Spin>
    );
  }
}

/**
 * @description action 作为 props 绑定
 * @param {Function} dispatch dispatch
 */
const mapDispatchToProps = (dispatch: Function,) => {
  return {
    changeLoading: (loading: boolean) => dispatch(toolsAction.changeLoading(loading)),
    setUserMsg: (userMsg: StoreReduxUser.IState) => dispatch(userAction.setUserMsg(userMsg)),
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
})(withRouter(MainLayout));

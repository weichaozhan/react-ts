import React from 'react';
import { Layout, Spin, } from 'antd';

import AppHeader from './Header';
import AppSider from './Sider';

const { Content, } = Layout;

class MainLayout extends React.Component<any, any> {
  public static defaultProps = {
  };

  public constructor(props: any) {
    super(props);
    this.state = {
      breadCrumb: [],
      loading: false,
    };
  }

  public render() {
    return (
      <Layout>
        <AppSider className="h-vh100" />
        <Layout>
          <AppHeader />
          <Content>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
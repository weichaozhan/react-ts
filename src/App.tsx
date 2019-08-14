import React from 'react';
import Router from './router/Index';
import {
  Button,
} from 'antd';

import MainLayout from './components/layout/Index';

class App extends React.Component<any, any> {
  public render() {
    return (
      <MainLayout>
        <Router />
      </MainLayout>
    );
  }
}

export default App;
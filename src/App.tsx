import React from 'react';
import Router from './router/Index';
import {
  Button,
} from 'antd';

class App extends React.Component<any, any> {
  public render() {
    return (
      <div className="test c-red" >
        <Button type="primary" >APP</Button>
        <Router />
      </div>
    );
  }
}

export default App;
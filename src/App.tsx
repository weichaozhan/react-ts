import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Router from './router/Index';

import rootRedeucer from './store/index';

import MainLayout from './components/layout/Index';

const store = createStore(rootRedeucer);

class App extends React.Component<any, any> {
  public render() {
    return (
      <Provider store={store}>
        <MainLayout>
          <Router />
        </MainLayout>
      </Provider>
    );
  }
}

export default App;
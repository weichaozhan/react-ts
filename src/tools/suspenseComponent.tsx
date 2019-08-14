/**
 * @description react16 Suspense 实现 loading
 */
import React, { Component, Suspense } from 'react';
import Loading from '../components/Loading.jsx';

export default function suspenseComponent(ComponentImport: React.ComponentClass) {
  class SuspenseComponent extends Component<any, any> {
    constructor(props:any) {
      super(props);
    }

    render() {
      return (
        <Suspense fallback={<Loading />}>
          <ComponentImport {...this.props} />
        </Suspense>
      );
    }
  };

  return SuspenseComponent;
};
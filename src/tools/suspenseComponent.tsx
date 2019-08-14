/**
 * @description react16 Suspense 实现 loading
 */
import React, { Component, Suspense } from 'react';
import Loading from '../components/Loading';

export default function suspenseComponent(ComponentImport: React.LazyExoticComponent<any>) {
  class SuspenseComponent extends Component<any, any> {

    public render() {
      return (
        <Suspense fallback={<Loading />}>
          <ComponentImport {...this.props} />
        </Suspense>
      );
    }
  }

  return SuspenseComponent;
}

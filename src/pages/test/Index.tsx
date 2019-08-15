import React from 'react';
import { RouteComponentProps, } from 'react-router';
import { withRouter, } from 'react-router-dom';
import { connect, } from 'react-redux';
import {
  Button,
} from 'antd';

import * as menuAction from '../../store/actions/menuAction';

interface IProps extends RouteComponentProps<{}> {
  className?: string;
}

class Test extends React.Component<IProps, any> {
  public static defaultProps = {
    className: '',
  };

  public render() {
    console.log(this.props);

    return (
      <div>
        <Button type="primary" >Test</Button>
      </div>
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
const mapStateToProps = (state: StoreReduxMenu.IState,) => {
  return {
    ...state,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Test));
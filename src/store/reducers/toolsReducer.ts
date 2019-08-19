import {
  CHANGE_LOADING,
} from '../actions/toolsAction';

const initialState: StoreReduxTools.IState = {
  loading: false, // 是否全局 loading
};

const menuReduser = (state: StoreReduxTools.IState = initialState, action: StoreReduxTools.IAction) => {
  switch (action.type) {
    case CHANGE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    default:
      return state;
  }
};

export default menuReduser;
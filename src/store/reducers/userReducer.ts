import {
  SET_USER_MSG,
} from '../actions/userAction';

const initialState: StoreReduxUser.IState = {
  userMsg: {}, // 用户信息
};

const userReduser = (state: StoreReduxUser.IState = initialState, action: StoreReduxUser.IAction) => {
  switch (action.type) {
    case SET_USER_MSG:
      return {
        ...state,
        userMsg: action.userMsg,
      };

    default:
      return state;
  }
};

export default userReduser;
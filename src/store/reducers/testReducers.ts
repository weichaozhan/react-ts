import {
  TEST_DO,
} from '../actions/testActions';

const initialState: StoreReduxTest.IState = {
  data: 'Initail Data',
  subData: 'test init',
};

const testReducer = (state: StoreReduxTest.IState = initialState, action: StoreReduxTest.IAction) => {
  switch (action.type) {
    case TEST_DO:
      return {
        ...state,
        subData: action.text,
      };

    default:
      return state;
  }
};

export default testReducer;
import userService from '../services/user';

const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getList();
    dispatch({
      type: 'INITIALIZE_USERS',
      data: users
    });
  };
};

export { initializeUsers };

export default (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE_USERS':
      return action.data;
    default:
      return state;
  }
};

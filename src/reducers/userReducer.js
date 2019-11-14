import userService from '../services/user';
import blogService from '../services/blogs';

const userStorageKey = 'bloglist-user';

let initialUser = null;
try {
  initialUser = JSON.parse(
    window.localStorage.getItem(userStorageKey)
  );
  if(initialUser !== null && initialUser.token) {
    blogService.setToken(initialUser.token);
  }
} catch(e) {
  initialUser = null;
}

const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await userService.login(username, password);
      blogService.setToken(user.token);
      window.localStorage.setItem(
        userStorageKey,
        JSON.stringify(user)
      );
      dispatch({
        type: 'LOGIN',
        data: user
      });
      return user;
    } catch(e) {
      return false;
    }
  };
};

const logout = () => {
  return dispatch => {
    window.localStorage.removeItem(userStorageKey);
    dispatch({
      type: 'LOGOUT'
    });
  };
};

export { login, logout };

export default (state = initialUser, action) => {
  switch(action.type) {
    case 'INIT':
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return null;
    default:
  }
  return state;
};

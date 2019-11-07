const initialState = {
  message: '',
  visible: false,
  level: 'error',
  id: 0
};

let notificationId = 0;

export const flashNotification = (message, options = {}) => {
  const id = notificationId++;
  const { duration, level } = options;
  return dispatch => {
    dispatch(newNotification(message, id, level));
    setTimeout(() => {
      dispatch(hideNotification(id));
    }, (duration || 5) * 1000);
  };
};

const newNotification = (message, id, level) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      message, id, level,
      visible: true
    }
  };
};

const hideNotification = id => {
  return {
    type: 'HIDE_NOTIFICATION',
    data: { id, visible: false }
  };
};

const setNotification = (
  state, {
    message = initialState.message,
    id = initialState.id,
    level = initialState.level
  } = {}
) => {
  return {
    ...state,
    message, id, level,
    visible: !!message
  };
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_NOTIFICATION':
      return setNotification(state, action.data);
    case 'HIDE_NOTIFICATION':
      if(state.id !== action.data.id) return state;
      return setNotification(state, action.data);
    default:
  }
  return state;
};

export default reducer;

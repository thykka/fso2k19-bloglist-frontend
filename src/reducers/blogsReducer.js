import blogsService from '../services/blogs';

const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll();
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs
    });
  };
};

const likeBlog = id => {
  return async dispatch => {
    const updatedBlog = await blogsService.like(id);
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    });
  };
};

const removeBlog = id => {
  return async dispatch => {
    const success = await blogsService.remove(id);
    if(success) {
      dispatch({
        type: 'REMOVE_BLOG',
        data: id
      });
    } else {
      // TODO: wat do if api call fails?
    }
    return success;
  };
};

const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogsService.create(blog);
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      });
      return newBlog;
    } catch(e) {
      return false;
    }
  };
};

const newComment = comment => {
  return async dispatch => {
    try {
      const updatedBlog = await blogsService.addComment(comment);
      dispatch({
        type: 'NEW_COMMENT',
        data: updatedBlog
      });
      return true;
    } catch(e) {
      return false;
    }
  };
};

export { initializeBlogs, likeBlog, removeBlog, createBlog, newComment };

const create = (state, newBlog) => {
  return [...state, newBlog];
};

const like = (state, data) => {
  const { id, likes } = data;
  return state.map(blog => blog.id !== id ? blog : {
    ...blog, likes
  });
};

const remove = (state, id) => {
  return state.filter(blog => blog.id !== id);
};

const addComment = (state, updatedBlog) => {
  return [...state.filter(blog => blog.id !== updatedBlog.id), updatedBlog];
};

export default (state = [], action) => {
  let updatedState = false;
  switch(action.type) {
    case 'INITIALIZE_BLOGS':
      updatedState = action.data;
      break;
    case 'LIKE_BLOG':
      updatedState = like(state, action.data);
      break;
    case 'NEW_BLOG':
      updatedState = create(state, action.data);
      break;
    case 'REMOVE_BLOG':
      updatedState = remove(state, action.data);
      break;
    case 'NEW_COMMENT':
      updatedState = addComment(state, action.data);
      break;
    default:
  }
  return (updatedState || state);
};

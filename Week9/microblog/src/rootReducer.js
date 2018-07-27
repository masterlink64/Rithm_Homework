// reducer (state, action)
import uuid from 'uuid';
const INITIAL_STATE = {
  posts: [
    { title: 'Why is the sky blue?', body: 'Google it', id: uuid() },
    { title: 'post2', body: 'What?', id: uuid() }
  ]
};

function rootReducer(state = INITIAL_STATE, action) {
  // conditionals to handle different types of actions
  if (action.type === 'ADD_POST') {
    return { ...state, posts: [...state.posts, action.post] };
  }
  if (action.type === 'DELETE') {
    return {
      ...state,
      posts: state.posts.filter(post => {
        return post.id !== action.id;
      })
    };
  }
  return state;
}

export default rootReducer;

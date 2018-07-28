// reducer (state, action)
import uuid from 'uuid';
const INITIAL_STATE = {
  posts: [
    {
      title: 'Why is the sky blue?',
      body: 'Google it',
      id: uuid(),
      isEditing: false
    },
    { title: 'post2', body: 'What?', id: uuid(), isEditing: true }
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
  if (action.type === 'EDIT') {
    const updatedPost = state.posts.map(post => {
      if (post.id === action.id) {
        post.isEditing = false;
        post.title = action.editedPost.title;
        post.body = action.editedPost.body;
        return post;
      } else {
        return post;
      }
    });
    return {
      ...state,
      posts: updatedPost
    };
  }
  if (action.type === 'TOGGLE_EDIT') {
    console.log('here we are!');
    const toggleEditedPosts = state.posts.map(post => {
      if (post.id === action.id) {
        post.isEditing = true;
        return post;
      } else {
        return post;
      }
    });
    return { ...state, posts: toggleEditedPosts };
  }
  return { ...state };
}

export default rootReducer;

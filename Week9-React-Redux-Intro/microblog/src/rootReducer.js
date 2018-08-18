// reducer (state, action)
const INITIAL_STATE = {
  posts: []
  // posts: [
  //   // dummy data
  //   {
  //     title: 'Why is the sky blue?',
  //     body: 'Google it',
  //     id: 555,
  //     comments: []
  //   },
  //   { title: 'post2', body: 'What?', id: 400, comments: [] }
  // ]
};

function rootReducer(state = INITIAL_STATE, action) {
  // conditionals to handle different types of actions
  // if (action.type === 'ADD_POST') {
  //   return { ...state, posts: [...state.posts, action.post] };
  // }
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
        post.title = action.title;
        post.body = action.body;
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
  if (action.type === 'FETCH_POSTS') {
    return { ...state, posts: action.posts };
  }
  if (action.type === 'ADD_POST') {
    return { ...state, posts: [...state.posts, action.posts] };
  }
  // REFACTOR CODE AND ADD WORKING SOLUTION
  if (action.type === 'ADD_COMMENT') {
    // need to add comment into post obj and array
    const updatedPosts = state.posts.map(post => {
      if (post.id === action.comment.post_id) {
        // action.comment = single comment {post_id: 23, text: 'whatever', id: 11}
        post.comments = [...post.comments, action.comment];
        return post;
      } else {
        return post;
      }
    });
    return { ...state, posts: updatedPosts };
  }
  // if (action.type === 'DELETE_COMMENT') {
  //   const updatedPosts = state.post.map(post => {
  //     // want to grab the right post and filter out the right comments
  //    if(post.id === action.comment)
  //   });
  // }
  return { ...state };
}

export default rootReducer;

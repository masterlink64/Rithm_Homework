import axios from 'axios';

export function fetchPosts() {
  return async function(dispatch) {
    const response = await axios.get('http://localhost:3000/api/posts');
    return dispatch({
      type: 'FETCH_POSTS',
      posts: response.data
    });
  };
}

// thunks are functions that wraps expressions that will happen later
export function addPost(title, body) {
  return async function(dispatch) {
    const response = await axios.post('http://localhost:3000/api/posts', {
      title,
      body
    });
    return dispatch({ type: 'ADD_POST', posts: response.data });
  };
}

export function deletePost(id) {
  return async function(dispatch) {
    debugger;
    const response = await axios.delete(
      `http://localhost:3000/api/posts/${id}`
    );
    return dispatch({ type: 'DELETE', id });
  };
}

export function editPost(obj) {
  return async function(dispatch) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/posts/${obj.id}`,
        obj
      );
      return dispatch({
        type: 'EDIT',
        id: obj.id,
        title: obj.title,
        body: obj.body
      });
    } catch (err) {
      debugger;
      console.log(err);
    }
  };
}

export function addComment(id, comment) {
  return async function(dispatch) {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/posts/${id}/comments`,
        { text: comment }
      );
      // eval(require('locus'));
      return dispatch({ type: 'ADD_COMMENT', comment: response.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteComment(post_id, comment_id) {
  return async function(dispatch) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/posts/${post_id}/comments/${comment_id}`
      );
      return dispatch({ type: 'DELETE_COMMENT', post_id, comment_id });
    } catch (err) {
      console.log(err);
    }
  };
}

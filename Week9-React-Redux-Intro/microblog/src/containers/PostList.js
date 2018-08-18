import React, { Component } from 'react';
import Post from '../components/Post';
import { connect } from 'react-redux';
import { fetchPosts, deletePost, editPost } from '../actionCreators';
import Comments from '../components/Comments';
import NewCommentForm from './NewCommentForm';

class PostList extends Component {
  // delete function needs to update redux state
  // will need componentDidMount in order to use the thunk from actionCreators
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
  render() {
    return (
      <div>
        <h3>
          {/* posts array is from redux state */}
          {this.props.posts.map(post => (
            <div key={post.id}>
              <Post
                title={post.title}
                body={post.body}
                key={post.id}
                id={post.id}
                delete={() => this.props.dispatch(deletePost(post.id))}
                edit={obj => this.props.dispatch(editPost(obj))}
                // toggleEdit={() => {
                //   this.props.dispatch({ type: 'TOGGLE_EDIT', id: post.id });
                // }}
                isEditing={post.isEditing}
              />
              <h3>Comments in a list</h3>
              <Comments comments={post.comments} />
              <NewCommentForm id={post.id} />
            </div>
          ))}
        </h3>
      </div>
    );
  }
}
function mapStateToProps(reduxState) {
  return {
    posts: reduxState.posts
  };
}

export default connect(mapStateToProps)(PostList);

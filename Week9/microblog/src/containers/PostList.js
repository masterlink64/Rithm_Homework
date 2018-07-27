import React, { Component } from 'react';
import Post from '../components/Post';
import { connect } from 'react-redux';

class PostList extends Component {
  // delete function needs to update redux state
  render() {
    return (
      <div>
        <h3>
          {/* posts arry is from redux state */}
          {this.props.posts.map(post => (
            <Post
              title={post.title}
              body={post.body}
              id={post.id}
              delete={() =>
                this.props.dispatch({ type: 'DELETE', id: post.id })
              }
            />
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

import React, { Component } from 'react';
import Post from '../components/Post';
import { connect } from 'react-redux';

class PostList extends Component {
  render() {
    return (
      <div>
        <h3>
          {/* map the passed down array from parent */}
          {this.props.posts.map(post => (
            <Post title={post.title} body={post.body} />
          ))}
        </h3>
      </div>
    );
  }
}

export default PostList;

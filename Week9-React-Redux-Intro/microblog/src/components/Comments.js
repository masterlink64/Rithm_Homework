import React, { Component } from 'react';
import uuid from 'uuid';
import deleteComment from '../actionCreators';

export default class Comments extends Component {
  render() {
    if (this.props.comments === undefined) {
      return <p>No comments</p>;
    } else {
      return (
        <div>
          {/* bring in comments as props? and render */}
          <div>
            {/* comments brought in as an array of objects [{text: 'owiejf'} ] */}
            {this.props.comments.map(comment => {
              <div key={comment.id}>
                {comment.text}
                <i
                  className="fa fa-times text-danger ml-1"
                  onClick={() =>
                    this.props.deleteComment(this.props.post.id, comment.id)
                  }
                />
              </div>;
            })}
          </div>
        </div>
      );
    }
  }
}

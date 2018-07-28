import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

class NewPostForm extends Component {
  state = {
    title: '',
    body: ''
  };
  handleTitleChange = evt => {
    this.setState({
      title: evt.target.value
    });
  };

  handleBodyChange = evt => {
    this.setState({
      body: evt.target.value
    });
  };

  render() {
    return (
      <div>
        <h3>New Post Form</h3>
        <form
          onSubmit={evt => {
            evt.preventDefault();
            this.props.dispatch({
              type: 'ADD_POST',
              post: {
                title: this.state.title,
                body: this.state.body,
                id: uuid()
              }
            });
            this.setState({
              title: '',
              body: ''
            });
          }}
        >
          <div>
            <label htmlFor="Title">Title</label>
          </div>
          <input
            value={this.state.title}
            type="text"
            id="Title"
            onChange={this.handleTitleChange}
          />
          <div>
            <div>
              <label htmlFor="Body">Body</label>
            </div>
            <textarea
              name="Body"
              id="Body"
              cols="30"
              rows="10"
              onChange={this.handleBodyChange}
              value={this.state.body}
            />
          </div>
          <input type="submit" value="add" />
        </form>
      </div>
    );
  }
}

export default connect()(NewPostForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';

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
          onSubmit={evt =>
            this.props.handleSubmit(evt, this.state.title, this.state.body)
          }
        >
          <label htmlFor="Title">Title</label>
          <input type="text" id="Title" onChange={this.handleTitleChange} />
          <label htmlFor="Body">Body</label>
          <textarea
            name="Body"
            id="Body"
            cols="30"
            rows="10"
            onChange={this.handleBodyChange}
          />
          <input type="submit" value="add" />
        </form>
      </div>
    );
  }
}

export default NewPostForm;

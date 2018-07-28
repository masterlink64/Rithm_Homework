import React, { Component } from 'react';

export default class Post extends Component {
  state = {
    title: this.props.title,
    body: this.props.body
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
    if (this.props.isEditing === true) {
      return (
        <div>
          <h3>Edit Post Form</h3>
          <form
            onSubmit={() =>
              this.props.edit({
                title: this.state.title,
                body: this.state.body
              })
            }
          >
            <label htmlFor="Title">Title</label>
            <div>
              <input
                value={this.state.title}
                type="text"
                id="Title"
                onChange={this.handleTitleChange}
              />
            </div>
            <label htmlFor="Body">Body</label>
            <div>
              <textarea
                name="Body"
                id="Body"
                cols="30"
                rows="10"
                onChange={this.handleBodyChange}
                value={this.state.body}
              />
            </div>
            <div>
              <input type="submit" value="Edit" />
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h2>{this.props.title}</h2>
          <h3>{this.props.body}</h3>
          <button onClick={this.props.toggleEdit}>Edit Me!</button>
          <button onClick={this.props.delete}>Delete Me!</button>
        </div>
      );
    }
  }
}

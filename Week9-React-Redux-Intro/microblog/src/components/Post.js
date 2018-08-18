import React, { Component } from 'react';

export default class Post extends Component {
  state = {
    title: this.props.title,
    body: this.props.body,
    isEditing: false
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  // handleBodyChange = evt => {
  //   this.setState({
  //     body: evt.target.value
  //   });
  // };
  render() {
    if (this.state.isEditing === true) {
      return (
        <div>
          <h3>Edit Post Form</h3>
          <form
            onSubmit={() =>
              this.props.edit({
                title: this.state.title,
                body: this.state.body,
                id: this.props.id
              })
            }
          >
            <label htmlFor="Title">Title</label>
            <div>
              <input
                value={this.state.title}
                type="text"
                id="Title"
                name="title"
                onChange={this.handleChange}
              />
            </div>
            <label htmlFor="Body">Body</label>
            <div>
              <textarea
                name="body"
                id="Body"
                cols="30"
                rows="10"
                onChange={this.handleChange}
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
          <button onClick={() => this.setState({ isEditing: true })}>
            Edit Me!
          </button>
          <button onClick={this.props.delete}>Delete Me!</button>
        </div>
      );
    }
  }
}

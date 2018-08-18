import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actionCreators';

class NewCommentForm extends Component {
  state = {
    text: ''
  };
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.dispatch(addComment(this.props.id, this.state.text));
    this.setState({
      text: ''
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="comment">Add Comment</label>
          </div>
          <div>
            <textarea
              name="text"
              id="comment"
              cols="20"
              rows="5"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input type="submit" value="Add Comment!" />
          </div>
        </form>
      </div>
    );
  }
}

// can use mapDispatchToProps in 2nd param if you want
// this will overwrite dispatch in this component
export default connect()(NewCommentForm);

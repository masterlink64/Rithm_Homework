import React, { Component } from 'react';

class CustomLink extends Component {
  state = { target: '_self' };

  openLink = evt => {
    this.setState({ target: '_blank' });
    this.props.clickLink(evt);
  };

  render() {
    return (
      <a
        onClick={this.openLink}
        target={this.state.target}
        href={this.props.href}
      >
        {this.props.text}
      </a>
    );
  }
}

export default CustomLink;

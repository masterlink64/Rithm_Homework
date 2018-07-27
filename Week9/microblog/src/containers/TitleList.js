import React, { Component } from 'react';
import { connect } from 'react-redux';

class TitleList extends Component {
  render() {
    return (
      <div>
        <h1>Titles</h1>
        <ul>{this.props.titles.map(title => <li>{title}</li>)}</ul>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const titles = reduxState.posts.map(post => post.title);
  return {
    // will need to grab just the title
    titles: titles
  };
}

export default connect(mapStateToProps)(TitleList);

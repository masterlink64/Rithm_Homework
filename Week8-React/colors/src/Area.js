import React, { Component } from 'react';
import Box from './Box';

class Area extends Component {
  // add how many boxes in order to
  render() {
    console.log('Area render');
    return (
      <div className="Area">{Array.from({ length: 24 }).map(b => <Box />)}</div>
    );
  }
}

export default Area;

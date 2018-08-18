import React, { Component } from 'react';
import Box from './Box';

class BoxList extends Component {
  render() {
    console.log('rendering boxlist');
    const boxes = this.props.boxes.map((box, idx) => {
      return (
        <Box
          width={box.width}
          height={box.height}
          backgroundColor={box.backgroundColor}
          key={idx}
        />
      );
    });

    return <div className="BoxList">{boxes}</div>;
  }
}

export default BoxList;

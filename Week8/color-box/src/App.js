import React, { Component } from 'react';
import BoxList from './BoxList';
import NewBoxForm from './NewBoxForm';
import './App.css';

class App extends Component {
  state = {
    boxes: [
      { width: 100, height: 150, backgroundColor: 'red' },
      { width: 150, height: 150, backgroundColor: 'blue' },
      { width: 100, height: 300, backgroundColor: 'green' }
    ]
  };
  // function to pass as prop to newboxform
  addBox = obj => {
    // add newBox from form to this.state.boxes
    this.setState({
      boxes: this.state.boxes.concat(obj)
    });
  };
  render() {
    return (
      <div className="App">
        <BoxList boxes={this.state.boxes} />
        {/* NewBoxForm will have a property */}
        <NewBoxForm boxInfo={this.addBox} />
      </div>
    );
  }
}

export default App;

/*


const boxes = [
      { width: 100, height: 150, backgroundColor: 'red' },
      { width: 150, height: 150, backgroundColor: 'blue' },
      { width: 100, height: 300, backgroundColor: 'green' }
    ]

this.state.boxes
*/

import React, { Component } from 'react';
import CustomLink from './CustomLink';

class App extends Component {
  state = { active: true };

  toggleLinks = () => {
    this.setState({ active: !this.state.active });
  };

  handleClick = evt => {
    if (this.state.active === false) {
      evt.preventDefault();
    }
  };

  render() {
    const links = [
      { href: 'https://www.rithmschool.com', text: 'Rithm School' },
      { href: 'https://facebook.github.io/react/', text: 'React Docs' },
      { href: 'https://www.codewars.com/dashboard', text: 'CodeWars' }
    ];
    return (
      <div className="App">
        <ul className="App-Links">
          {links.map(link => (
            <li>
              <CustomLink
                href={link.href}
                text={link.text}
                //clickLink refers to handleClick and it is passed into CustomLink as a prop
                clickLink={this.handleClick}
              />{' '}
            </li>
          ))}
        </ul>
        <button onClick={this.toggleLinks}>toggleDisablingLinks</button>
      </div>
    );
  }
}

export default App;

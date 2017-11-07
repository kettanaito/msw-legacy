import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>Mockery</h1>
        <p>An example.</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

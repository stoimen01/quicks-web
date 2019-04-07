import React, { Component } from 'react';
import './Quicks.css';
import Entry from "./entry/Entry";

interface P {}

interface S {}

class Quicks extends Component<P, S> {

  constructor(props: P) {
    super(props);
  }

  render() {
    return (
        <div className="App">
          <Entry/>
        </div>
    );
  }

}

export default Quicks;

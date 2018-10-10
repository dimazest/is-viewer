import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import PopperJS from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
        <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <span class="navbar-brand">Incident Streams</span>
        </nav>
    );
  }
}

export default App;

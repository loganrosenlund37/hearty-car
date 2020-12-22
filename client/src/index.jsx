import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const user = {
  firstName: "Logan",
  lastName: "Rosenlund",
  vehicles: {
    uv1: "2015 Ford F-150",
    uv2: "2012 Ford Fusion",
  },
}

ReactDOM.render(<App user={user} />, document.getElementById('app'));

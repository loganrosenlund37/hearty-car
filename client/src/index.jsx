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
  vehicleList: ["2015 Ford F-150", "2012 Ford Fusion"],
  default: "2015 Ford F-150",
  email: "loganrosenlund61@gmail.com"
}

ReactDOM.render(<App />, document.getElementById('app'));

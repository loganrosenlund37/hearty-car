import React, { useState, useEffect } from 'react';
import Home from './Home.jsx';
import Mileage from './Mileage.jsx';
import Account from './Account.jsx';
import axios from 'axios';

function App(props) {

  let [ view, setView ] = useState('home');
  let [ current, setCurrent ] = useState({data: []});
  let [ user, setUser ] = useState({});

  useEffect(() => {
    if (user.firstName === undefined) {
      axios.get(`/api/users/Logan`)
        .then((response) => {
          setUser(response.data[0]);
          updateCurrent(response.data[0].default)
        })
        .catch(err => console.log(err));
      }
    console.log('Mount and update.');
    return () => {
      console.log('Cleanup.');
    };
  });

  function updateCurrent(vehicle) {
    axios.get(`/api/vehicles/${vehicle}`)
      .then((response) => {
        setCurrent(response.data[0]);
      })
      .catch(err => console.log(err));
  }

  function updateOdometer(miles) {
    axios.post(`/api/odometer/?miles=${miles}&vehicle=${current.name}`)
      .then((response) => {
        console.log(response);
      })
      .catch(err => console.log(err));
    updateCurrent(current.name);
  }

  function changeView(newView) {
    setView(newView);
  }

  if (user.firstName === undefined) {
    return (
      <div> Loading ... </div>
    )
  } else if (view === 'home') {
    return (
      <Home {...props} user={user} onViewChange={changeView} current={current} view={view} updateCurrent={updateCurrent} updateOdometer={updateOdometer}/>
    )
  } else if (view === 'mileage') {
    return (
      <Mileage {...props} onViewChange={changeView} current={current.name} view={view} />
    )
  } else if (view === 'account') {
    return (
      <Account {...props} user={user} onViewChange={changeView} view={view} />
    )
  }
}

export default App;

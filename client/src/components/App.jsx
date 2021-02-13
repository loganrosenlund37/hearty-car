import React, { useState, useEffect } from 'react';
import Home from './Home.jsx';
import Mileage from './Mileage.jsx';
import Account from './Account.jsx';
import axios from 'axios';
const regeneratorRuntime = require("regenerator-runtime");

function App(props) {

  let [ view, setView ] = useState('home');
  let [ current, setCurrent ] = useState({data: []});
  let [ user, setUser ] = useState({});
  let [ mileage, setMileage ] = useState({});

  useEffect(() => {
    if (user.firstName === undefined) {
      axios.get(`/api/users/Logan`)
        .then((response) => {
          setUser(response.data[0]);
          updateCurrent(response.data[0].default);
        })
        .catch(err => console.log(err));
      }
      console.log('Mount and update.');
      return () => {
        console.log('Cleanup.');
      };
    }, []);
    
    async function updateCurrent(vehicle) {
      try {
        const response = await axios.get(`/api/vehicles/${vehicle}`);
        setCurrent(response.data[0]);
        getMileageInfo(response.data[0].vid);
      } catch (error) {
        console.error(error);
      }
    }

  async function updateOdometer(miles) {
    try {
      const response = await axios.post(`/api/odometer/?miles=${miles}&vehicle=${current.name}`);
      updateCurrent(current.name);
    } catch (error) {
      console.error(error);
    }
  }

  async function getMileageInfo(vid) {
    try {
      const response = await axios.get(`/api/mileage/${vid}`);
      setMileage(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  function changeView(newView) {
    setView(newView);
  }

  async function updateAverageMileage(date, mpg, gallons, cost, odometer) {

    let fuel = Number(mileage.average.totalFuel) + Number(gallons);
    fuel = Number(fuel.toFixed(2));
    const totalMoney = Number(mileage.average.totalMoney) + (cost);
    const sumMpg = Number(mileage.average.grandTotal) + Number(mpg);
    const counter = Number(mileage.average.counter) + 1;
    const total = Number(mileage.average.grandTotal) + Number(mpg);
    let newAverage = Number(total) / Number(counter);
    newAverage = Number(newAverage.toFixed(2));

    // send post request to server
    try {
      const response = await axios.post(`/api/mileage?date=${date}&mpg=${mpg}&gallons=${gallons}&cost=${cost}&odometer=${odometer}&money=${totalMoney}&fuel=${fuel}&sumMpg=${sumMpg}&counter=${counter}&vid=${current.vid}&grandTotal=${total}&newAverage=${newAverage}`);

      // invoke updateCurrent
      updateCurrent(current.name);
    } catch (error) {
      console.error(error);
    }

  }

  if (user.firstName === undefined) {
    return (
      <div> Loading ... </div>
    )
  } else if (view === 'home') {
    return (
      <div>
        <Home {...props} user={user} onViewChange={changeView} current={current} view={view} updateCurrent={updateCurrent} updateOdometer={updateOdometer}/>
        <div class="footer">
          &#169; Copyright 2021
        </div>
      </div>
    )
  } else if (view === 'mileage') {
    return (
      <div>
        <Mileage {...props} onViewChange={changeView} current={current.name} view={view} mileage={mileage} updateAverageMileage={updateAverageMileage} />
        <div class="footer">
        &#169; Copyright 2021
        </div>
      </div>
    )
  } else if (view === 'account') {
    return (
      <div>
        <Account {...props} user={user} onViewChange={changeView} view={view} />
        <div class="footer">
        &#169; Copyright 2021
        </div>
      </div>
    )
  }
}

export default App;

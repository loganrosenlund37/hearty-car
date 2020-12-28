import React, { useState, useEffect } from 'react';

function Home(props) {

  // let [ timeFrame, setTimeFrame] = useState

  function handleViewChange(event) {
    props.onViewChange(event.target.innerText.toLowerCase());
  }

  function handleChange(event) {
    // Change time to event.target.value
    console.log(event.target.value);
  }

  function handleVehicleChange(event) {
    console.log("Change the vehicle yo!");
  }

  function handleOdometerUpdate(event) {
    console.log("Change the odometer yo!");
  }

  return (
    <div>
      <h1 class="header"> Hello {props.user.firstName} </h1>
      <hgroup class="subheader" >
        <h2 class="selected" onClick={handleViewChange}> Home </h2>
        <h2 onClick={handleViewChange}> Mileage </h2>
        <h2 onClick={handleViewChange}> Account </h2>
      </hgroup>
      <div>
        <div>
          {props.current.name}
          <small class="small" onClick={handleVehicleChange}> change </small>
        </div>
        <div>
          {props.current.odometer}
          <small class="small" onClick={handleOdometerUpdate}> update </small>
        </div>
      </div>
      <div>
        UPCOMING MAINTENANCE:
        {props.current.data.map((item) => {
          return (
            <div>
              <div> {item.desc} </div>
              <div> {item.due_mileage} </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home;

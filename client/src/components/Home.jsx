import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';

function Home(props) {

  let [ newVehicle, setNewVehicle ] = useState("2015 Ford F-150");
  let [ miles, setMiles ] = useState("");

  function handleViewChange(event) {
    props.onViewChange(event.target.innerText.toLowerCase());
  }

  function handleChange(event) {
    console.log(event.target.value);
    setNewVehicle(event.target.value);
  }

  function handleVehicleChange(event) {
    event.preventDefault();
    props.updateCurrent(newVehicle);
    setNewVehicle("2015 Ford F-150")
  }

  function handleOdometerUpdate(event) {
    props.updateOdometer(miles);
    setMiles("");
  }

  function handleOdometerChange(event) {
    setMiles(event.target.value);
  }

  function addMaintenanceItem() {
    console.log("Add a maintenance item has been clicked");
  }

  return (
    <div class="home">
      <div class="header">
        <h1> Hello {props.user.firstName} </h1>
      </div>
      <hgroup class="subheader">
        <h2 class="selected" > Home </h2>
        <h2 class="mileage" onClick={handleViewChange}> Mileage </h2>
        <h2 class="account" onClick={handleViewChange}> Account </h2>
      </hgroup>
      <div>
        <div class="row">
          <h3>
            Vehicle: {props.current.name}
          </h3>
          <Modal
            activator={({ setShow }) => (
              <small
                class="small"
                type="button"
                onClick={() => setShow(true)}
              >
                change
              </small>
            )}
            >
            <form>
              <label class="slct-vhcl">
                <h5>
                  Select vehicle:
                </h5>
                <select onChange={handleChange}>
                  {props.user.vehicleList.map((vehicle) => {
                    return <option value={vehicle}> {vehicle} </option>
                  })}
                </select>
              </label>
            </form>
            <button onClick={handleVehicleChange} > SUBMIT </button>
          </Modal>
        </div>
        <div class="row">
          <h3>
            Odometer: {Intl.NumberFormat('en-us').format(props.current.odometer)} miles
          </h3>
          <Modal
            activator={({ setShow }) => (
              <small
                class="small"
                type="button"
                onClick={() => setShow(true)}
              >
                update
              </small>
            )}
          >
            <form>
              <label>
                <h5>
                  Current miles:
                </h5>
                <input type="text" value={miles} onChange={handleOdometerChange} />
              </label>
            </form>
            <button onClick={handleOdometerUpdate} > UPDATE </button>
          </Modal>
        </div>
      </div>
      <button onClick={addMaintenanceItem}> ADD MAINTENANCE ITEM </button>
      <div class="home-body">
        <h4>
          UPCOMING MAINTENANCE:
        </h4>
        {props.current.data.map((item) => {
          if (item.due_mileage > props.current.odometer) 
          return <div>
                   <div class="maitna"> <bold> Maintenance item: </bold> {item.desc} </div>
                   <div class="maitda"> Due in: <bold> {Intl.NumberFormat('en-us').format(item.due_mileage - props.current.odometer)} </bold>  miles </div>
                 </div>
        })}
      </div>
    </div>
  )
}

export default Home;

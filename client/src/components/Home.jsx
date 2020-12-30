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
    <div>
      <h1 class="header"> Hello {props.user.firstName} </h1>
      <hgroup class="subheader" >
        <h2 class="selected" > Home </h2>
        <h2 onClick={handleViewChange}> Mileage </h2>
        <h2 onClick={handleViewChange}> Account </h2>
      </hgroup>
      <div>
        <div>
          {props.current.name}
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
              <label>
                Select vehicle:
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
        <div>
          {props.current.odometer}
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
                Current miles:
                <input type="text" value={miles} onChange={handleOdometerChange} />
              </label>
            </form>
            <button onClick={handleOdometerUpdate} > UPDATE </button>
          </Modal>
        </div>
      </div>
      <button onClick={addMaintenanceItem}> ADD MAINTENANCE ITEM </button>
      <div>
        UPCOMING MAINTENANCE:
        {props.current.data.map((item) => {
          if (item.due_mileage > props.current.odometer) 
          return <div>
                   <div> {item.desc} </div>
                   <div> {item.due_mileage} </div>
                 </div>
        })}
      </div>
    </div>
  )
}

export default Home;

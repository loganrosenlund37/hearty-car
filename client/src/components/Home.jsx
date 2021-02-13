import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';

function Home(props) {

  let [ newVehicle, setNewVehicle ] = useState("2015 Ford F-150");
  let [ miles, setMiles ] = useState("");
  const [ showOdometerModal, setShowOdometerModal ] = useState(false);
  const [ showVehicleModal, setShowVehicleModal ] = useState(false);

  function handleViewChange(e) {
    props.onViewChange(e.target.innerText.toLowerCase());
  }

  function handleChange(e) {
    setNewVehicle(e.target.value);
  }

  function handleVehicleChange(e) {
    e.preventDefault();
    props.updateCurrent(newVehicle);
    setNewVehicle("2015 Ford F-150")
  }

  function handleOdometerUpdate(e) {
    e.preventDefault();
    props.updateOdometer(miles);
    setMiles("");
  }

  function handleOdometerChange(event) {
    setMiles(event.target.value);
  }

  function addMaintenanceItem() {
    console.log("Add a maintenance item has been clicked");
  }

  function closeSelectVehicleModal(e) {
    e.preventDefault();
    toggleVehicleModal();
    handleVehicleChange(e);
  }

  function closeOdometerModal(e) {
    e.preventDefault();
    handleOdometerUpdate(e);
    toggleOdometerModal();
  }
  
  const handleKeyPress = (e) => {
    e.preventDefault();
    if(e.key === "Enter") {
      handleOdometerUpdate(e);
    }
  }

  const toggleOdometerModal = () => setShowOdometerModal(!showOdometerModal);
  const toggleVehicleModal = () => setShowVehicleModal(!showVehicleModal);

  return (
    <div class="home">
      <div class="header">
        <h1> Hello {props.user.firstName} </h1>
      </div>
      <hgroup class="subheader">
        <h2 class="selected" > Home </h2>
        <h2 class="mileage" onClick={handleViewChange} > Mileage </h2>
        <h2 class="account" onClick={handleViewChange} > Account </h2>
      </hgroup>
      <div>
        <div class="row">
          <h3> Vehicle: {props.current.name} </h3>
          <button onClick={toggleVehicleModal}> change </button>
          {
            showVehicleModal ? (
              <Modal>
                <form>
                  <label class="slct-vhcl">
                    <h5> Select vehicle: </h5> 
                      <select onChange={handleChange}>
                        {props.user.vehicleList.map((vehicle) => {
                          return <option value={vehicle}> {vehicle} </option>
                        })}
                      </select> 
                  </label>
                </form>
                <button onClick={closeSelectVehicleModal}> Select </button>
                <button onClick={toggleVehicleModal} > Cancel </button>
              </Modal>
            ) : null}
        </div>
        <div  class="row">
          <h3> Odometer: {Intl.NumberFormat('en-us').format(props.current.odometer)} miles </h3>
          <button onClick={toggleOdometerModal}> update </button>
          {
            showOdometerModal ? (
              <Modal>
                <form>
                  <label>
                    <h5> Current miles: </h5>
                    <input type="text" value={miles} onChange={handleOdometerChange} onKeyPress={handleKeyPress} /> 
                  </label>
                </form>
                <button onClick={closeOdometerModal}> Update </button>
                <button onClick={toggleOdometerModal}> Cancel </button>
              </Modal>
            ) : null}
        </div>

        <button onClick={addMaintenanceItem}> ADD MAINTENANCE ITEM </button>
        <div class="home-body" >
          <h4> UPCOMING MAINTENANCE: </h4>
          {props.current.data.map((item, key) => {
            if (item.due_mileage > props.current.odometer) 
            return <div>
                <div class="maitna"> <bold> Maintenance item: </bold> {item.desc} </div>
                <div class="maitda"> <bold> {Intl.NumberFormat('en-us').format(item.due_mileage - props.current.odometer)} </bold> miles </div>
              </div>
          })}
        </div>
      </div>
    </div>
  )

}

export default Home;

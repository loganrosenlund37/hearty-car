import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';

function Mileage(props) {
  let [ date, setDate ] = useState("");
  let [ odometer, setOdometer ] = useState();
  let [ gallons, setGallons ] = useState();
  let [ ppg, setPpg ] = useState();

  function handleViewChange(event) {
    props.onViewChange(event.target.innerText.toLowerCase());
  }

  function handleClick(event) {
    // Date, MPG, Gallons, Cost, ODOMETER
    let cost = ppg * gallons;
    let mpg = (odometer - props.mileage.average.lastFillup) / gallons;
    mpg = Number(mpg.toFixed(2));
    props.updateAverageMileage(date, mpg, gallons, cost, odometer);
    // reset fields
    setPpg("");
    setGallons("");
    setOdometer("");
    setDate("");
  }

  function handleChange(event) {
    if (event.target.name === "date") {
      const newDate = event.target.value;
      setDate(newDate.toString());
    } else if (event.target.name === "odometer") {
      setOdometer(event.target.value);
    } else if (event.target.name === "gallons") {
      setGallons(event.target.value);
    } else if (event.target.name === "ppg") {
      setPpg(event.target.value);
    }
  }

  if (!props.mileage.average) {
    return (
      <div> Loading... </div>
    )
  } else {
    return (
      <div>
        <h1 class="header"> {props.current} </h1>
        <hgroup class="subheader">
          <h2 onClick={handleViewChange}> Home </h2>
          <h2 class="selected" > Mileage </h2>
          <h2 onClick={handleViewChange}> Account </h2>
        </hgroup>
        <div class="container">
          <div>
            <Modal
              activator={({ setShow }) => (
                <button
                  class="small"
                  type="button"
                  onClick={() => setShow(true)}
                >
                  Add fillup
                </button>
              )}
            >
              <h1> Would you like to add a fillup? </h1>
              <form>
                <label>
                  Date:
                  <input
                    name="date"
                    type="string"
                    value={date}
                    onChange={handleChange} />
                </label>
                <label>
                  Odometer:
                  <input
                    name="odometer"
                    value={odometer}
                    onChange={handleChange} />
                </label>
                <label>
                  Gallons:
                  <input
                    name="gallons"
                    value={gallons}
                    onChange={handleChange} />
                </label>
                <label>
                  Price per gallon:
                  <input
                    name="ppg"
                    value={ppg}
                    onChange={handleChange} />
                </label>
              </form>
              <button onClick={handleClick}> Submit </button>
            </Modal>
          </div>
            <table>
              <thead>
                <tr>
                  <td> Average MPG </td>
                  <td> TOTAL $ </td>
                  <td> TOTAL GALLONS </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> {props.mileage.average.average} </td>
                  <td> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.mileage.average.totalMoney)} </td>
                  <td> {props.mileage.average.totalFuel} </td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <td> Date </td>
                  <td> MPG </td>
                  <td> Gallons </td>
                  <td> Cost </td>
                </tr>
              </thead>
              <tbody>
                {props.mileage.fillups.map((fillup) => {
                  return (
                    <tr>
                      <td> {fillup.date} </td>
                      <td> {fillup.mpg} </td>
                      <td> {fillup.gallons} </td>
                      <td> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(fillup.total)} </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
    )
  }
}

export default Mileage;

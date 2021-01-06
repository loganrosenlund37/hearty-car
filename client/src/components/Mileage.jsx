import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';

function Mileage(props) {
  const [ date, setDate ] = useState("");
  const [ odometer, setOdometer ] = useState();
  const [ gallons, setGallons ] = useState();
  const [ ppg, setPpg ] = useState();
  // const [ show, setShow ] = useState(false);

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
        <div class="header">
          <h1> {props.current} </h1>
        </div>
        <hgroup class="subheader">
          <h2 class="home-sub" onClick={handleViewChange}> Home </h2>
          <h2 class="selected" > Mileage </h2>
          <h2 class="account" onClick={handleViewChange}> Account </h2>
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
              <h4> Fill in all fields </h4>
              <form class="form">
                <label>
                  <h5>
                    Date:
                  </h5>
                  <input
                    name="date"
                    type="string"
                    value={date}
                    onChange={handleChange} />
                </label>
                <label>
                  <h5>
                    Odometer:
                  </h5>
                  <input
                    name="odometer"
                    value={odometer}
                    onChange={handleChange} />
                </label>
                <label>
                  <h5>
                    Gallons:
                  </h5>
                  <input
                    name="gallons"
                    value={gallons}
                    onChange={handleChange} />
                </label>
                <label>
                  <h5>
                    Price per gallon:
                  </h5>
                  <input
                    name="ppg"
                    value={ppg}
                    onChange={handleChange} />
                </label>
              </form>
              <button onClick={handleClick}> SUBMIT </button>
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
                  <td> {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.mileage.average.totalMoney)} </td>
                  <td> {props.mileage.average.totalFuel} </td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <td> Date </td>
                  <td> MPG </td>
                  <td> Cost </td>
                </tr>
              </thead>
              <tbody>
                {props.mileage.fillups.map((fillup) => {
                  return (
                    <tr>
                      <td> {fillup.date} </td>
                      <td> {fillup.mpg} </td>
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

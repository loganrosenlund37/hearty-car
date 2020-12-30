import React, { useState, useEffect } from 'react';

function Mileage(props) {

  function handleViewChange(event) {
    props.onViewChange(event.target.innerText.toLowerCase());
  }

  function handleClick(event) {
    console.log("I got clicked");
  }

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
          <button onClick={handleClick}> ADD FILLUP </button>
        </div>
        <table>
          <thead>
            <tr>
              <th colspan="4"> YEAR TO DATE CONSUMPTION </th>
            </tr>
            <tr>
              <td> YEAR </td>
              <td> Average MPG </td>
              <td> TOTAL $ </td>
              <td> TOTAL GALLONS </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> 2020 </td>
              <td> 20.26 </td>
              <td> $1,235 </td>
              <td> 349 </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Mileage;

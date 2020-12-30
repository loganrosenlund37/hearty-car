import React, { useState, useEffect } from 'react';

function Account(props) {

  function handleViewChange(event) {
    props.onViewChange(event.target.innerText.toLowerCase());
  }

  console.log(props);

  return (
    <div>
      <h1 class="header"> {props.user.firstName}'s Account </h1>
      <hgroup class="subheader">
        <h2 onClick={handleViewChange}> Home </h2>
        <h2 onClick={handleViewChange}> Mileage </h2>
        <h2 class="selected" > Account </h2>
      </hgroup>
      <div class="accountContainer">
        <div>
          <div>
            Email: {props.user.email}
          </div>
          <div class="mini-row">
            <div>
              Vehicles:
            </div>
            <div class="mini-column">
              {props.user.vehicleList.map((vehicle) => {
                return <div class="mini-row">
                  {vehicle}
                  <small> delete </small>
                  </div>
              })}
              <div> add vehicle </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            Manage subscription
          </div>
          <div>
            Delete account
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account;

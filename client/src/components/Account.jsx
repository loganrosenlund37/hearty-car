import React, { useState, useEffect } from 'react';

function Account(props) {

  function handleViewChange(event) {
    props.onViewChange(event.target.innerText.toLowerCase());
  }

  return (
    <div>
      <div class="header">
        <h1> {props.user.firstName}'s Account </h1>
      </div>
      <hgroup class="subheader">
        <h2 class="home-sub" onClick={handleViewChange}> Home </h2>
        <h2 class="mileage" onClick={handleViewChange}> Mileage </h2>
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

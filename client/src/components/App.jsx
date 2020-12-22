import React, { useState, useEffect } from 'react';

function App(props) {

  useEffect(() => {
    console.log('Mount and update.');

    return () => {
      console.log('Cleanup.');
    };
  });

  return (
    <div>
      <div> Hello {props.user.firstName} </div>
      <div> WHATS UP DETROIT?? </div>
    </div>
  )
}

export default App;

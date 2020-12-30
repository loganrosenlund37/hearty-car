import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, activator }) => {
  
  const [ show, setShow ] = useState(false);

  const content = show && (
    <div class="overlay">
      <div class="modal">
        <button
          class="modal-close"
          type="button"
          onClick={() => setShow(false)}
        >
          X
        </button>
        <div class="modal-body">
          {children}
          <button onClick={() => setShow(false)}> CLOSE </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {activator({ setShow })}
      {createPortal(content, document.body)}
    </>
  )

}

export default Modal;
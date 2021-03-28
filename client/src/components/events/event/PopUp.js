import React, { Component } from "react";
import "./event.css"

function PopUp(props) {
  return (props.trigger) ? (
    <div className="popup">
      <button className="close-btn" onClick={ () => props.setTrigger(false)}>x</button>
      { props.children }
    </div>
  ) : "";
}

export default PopUp;
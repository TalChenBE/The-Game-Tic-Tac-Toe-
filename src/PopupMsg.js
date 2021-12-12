import React from "react";
import Popup from "reactjs-popup";

function PopupMsg() {
  const CustomButton = React.forwardRef(({ open, ...props }, ref) => (
    <button className="button" ref={ref} {...props}>
      Trigger - {props.open ? "Opened" : "Closed"}
    </button>
  ));
  return (
    // need to forward ref if you are trying to use a function trigger with React Component
    <div>
      <Popup
        trigger={(open) => (
          <button className="button">
            Trigger - {open ? "Opened" : "Closed"}
          </button>
        )}
        position="right center"
        closeOnDocumentClick
      >
        <span> Popup content </span>
      </Popup>
      ;
    </div>
  );
}

export default PopupMsg;

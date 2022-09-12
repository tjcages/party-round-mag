import React from "react";
import useStore from "../store";

import DefaultIcon from "./DefaultIcon";

const Shortcut = (props) => {
  const isSelected = useStore(
    (state) => state.windows[props.window.id].selected
  );
  const toggleSelectedShortcut = useStore(
    (state) => state.toggleSelectedShortcut
  );

  function selectShortCut(event) {
    event.stopPropagation();
    switch (event.detail) {
      case 1:
        if (isSelected) {
          if (props.window.href) {
            window.open(props.window.href, "_blank");
          } else {
            props.openWindow(props.window.id);
          }
        } else toggleSelectedShortcut(props.window.id);
        break;
      case 2: {
        if (props.window.href) {
          window.open(props.window.href, "_blank");
        } else {
          props.openWindow(props.window.id);
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  return (
    <div
      className={`short-cut ${isSelected && "selected"}`}
      onClick={(e) => selectShortCut(e)}
    >
      <DefaultIcon icon={props.window.icon} />
      <div className="text">{props.window.title}</div>
    </div>
  );
};

export default Shortcut;

import React from "react";
import useStore from "../store";

import DefaultIcon from "./DefaultIcon";

const TaskBarItem = (props) => {
  const isActive = useStore((state) => state.windows[props.window.id].active);
  const isOpen = useStore((state) => state.windows[props.window.id].open);

  return (
    <div
      className={`task-bar-item ${isActive && "active"} ${isOpen && "open"}`}
      id={`task-bar-item-${props.window.id}`}
      onClick={() => props.unminimizeWindow(props.window)}
    >
      <div className="bevel">
        <DefaultIcon icon={props.window.icon} small />
        <div className="title">{props.window.title}</div>
      </div>
    </div>
  );
};

export default TaskBarItem;

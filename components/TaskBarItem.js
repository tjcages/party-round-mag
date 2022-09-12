import React from "react";
import useStore from "../store";
import styles from "../styles/taskbar.module.scss";

import DefaultIcon from "./DefaultIcon";

const TaskBarItem = (props) => {
  const isActive = useStore((state) => state.windows[props.window.id].active);
  const isOpen = useStore((state) => state.windows[props.window.id].open);
  const isMinimized = useStore((state) => state.windows[props.window.id].minimized);

  return (
    <div
      className={`${styles.taskBarItem} ${isActive && !isMinimized && styles.active} ${
        isOpen && styles.open
      }`}
      id={`task-bar-item-${props.window.id}`}
      onClick={() => props.unminimizeWindow(props.window)}
    >
      <div className={styles.bevel}>
        <DefaultIcon icon={props.window.icon} small />
        <div className={styles.title}>{props.window.title}</div>
      </div>
    </div>
  );
};

export default TaskBarItem;

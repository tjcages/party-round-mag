import React from "react";
import useStore from "../store";

import Shortcut from "./Shortcut";

export default function TaskBarItem(props) {
  const windows = useStore((state) => state.windows);
  const unselectAll = useStore((state) => state.unselectAll);

  return (
    <div className="short-cuts" onClick={unselectAll}>
      {windows.map((window) => {
        if (window.shortcut !== false)
          return (
            <Shortcut
              key={window.id}
              window={window}
              openWindow={props.openWindow}
            />
          );
      })}
    </div>
  );
}

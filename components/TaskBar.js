import React, { useEffect, useState } from "react";
import useStore from "../store";

import TaskBarItem from "./TaskBarItem";
import DefaultIcon from "./DefaultIcon";

const TaskBar = (props) => {
  const [time, setTime] = useState(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [programMenuOpen, setProgramMenuOpen] = useState(null);
  const windows = useStore((state) => state.windows);
  const openWindow = useStore((state) => state.openWindow);

  useEffect(() => {
    setClock();
    setInterval(setClock, 1000);
  });

  const setClock = () => {
    let now = new Date();
    let hours24 = now.getHours();
    let hours12 = hours24 > 12 ? hours24 - 12 : hours24;
    let minutes = now.getMinutes();
    if (minutes < 10)
      setTime(`${hours12}:0${now.getMinutes()} ${hours24 >= 12 ? "PM" : "AM"}`);
    else
      setTime(`${hours12}:${now.getMinutes()} ${hours24 >= 12 ? "PM" : "AM"}`);
  };

  function openStartMenu() {
    setStartMenuOpen(true);

    const onClickOutside = (event) => {
      const startMenu = document.querySelector(".start-menu");
      const programMenu = document.querySelector(".program-menu");
      if (
        !startMenu.contains(event.target) &&
        !programMenu.contains(event.target)
      ) {
        closeStartMenu();
        window.removeEventListener("mousedown", onClickOutside);
      }
    };

    setTimeout(
      () =>
        window.addEventListener("mousedown", onClickOutside, {
          passive: true,
        }),
      1
    );
  }

  function handleOpenProgram(windowObject) {
    if (windowObject.href) {
      window.open(windowObject.href, "_blank");
    } else {
      openWindow(windowObject.id);
    }
    closeStartMenu();
  }

  function closeStartMenu() {
    setStartMenuOpen(false);
    setProgramMenuOpen(null);
  }

  return (
    <div className="task-bar">
      <div className="bevel">
        <div className={`start-menu ${!startMenuOpen && "hidden"}`}>
          <div className="side-logo">
            <div className="text">
              <span className="windows">Party</span>
              <span className="version">Round</span>
            </div>
          </div>
          <div className="menu">
            <ul>
              <li onMouseEnter={() => setProgramMenuOpen(2)}>
                <DefaultIcon icon={{ src: "https://win98icons.alexmeub.com/icons/png/help_book_cool-4.png" }} mid />
                <div className="text">
                  <span className="underline">D</span>rops
                </div>
                <svg className="arrow" width="4" height="6" version="2.0">
                  <use href="#arrow-right" />
                </svg>
              </li>
              <li onMouseEnter={() => setProgramMenuOpen(1)}>
                <DefaultIcon icon={{ src: "https://win98icons.alexmeub.com/icons/png/joystick_alt-0.png" }} mid />
                <div className="text">
                  <span className="underline">E</span>xperiments
                </div>
                <svg className="arrow" width="4" height="6" version="2.0">
                  <use href="#arrow-right" />
                </svg>
              </li>
              <li
                onMouseEnter={() => setProgramMenuOpen(0)}
                onClick={() => window.open("https://twitter.com/PartyRound", "_blank")}
              >
                <DefaultIcon icon={{ src: "/img/bird.png" }} mid />
                <div className="text">
                  <span className="underline">T</span>witter
                </div>
                <svg className="arrow" width="4" height="6" version="2.0">
                  <use href="#arrow-right" />
                </svg>
              </li>
            </ul>
          </div>
        </div>

        <div className={`program-menu ${!programMenuOpen && "hidden"}`}>
          <div className="menu">
            <ul>
              {programMenuOpen === 1
                ? windows
                    .filter((window) => window.experiment) // EXPERIMENTS
                    .map((window) => (
                      <li
                        key={window.id}
                        onClick={() => handleOpenProgram(window)}
                      >
                        <div className="text">
                          <span className="underline">
                            {window.title.charAt(0)}
                          </span>
                          {window.title.substring(1)}
                        </div>
                        <svg
                          className="arrow"
                          width="4"
                          height="6"
                          version="2.0"
                        >
                          <use href="#arrow-right" />
                        </svg>
                      </li>
                    ))
                : windows
                    .filter((window) => window.drop) // DROPS
                    .map((window) => (
                      <li
                        key={window.id}
                        onClick={() => handleOpenProgram(window)}
                      >
                        <div className="text">
                          <span className="underline">
                            {window.title.charAt(0)}
                          </span>
                          {window.title.substring(1)}
                        </div>
                        <svg
                          className="arrow"
                          width="4"
                          height="6"
                          version="2.0"
                        >
                          <use href="#arrow-right" />
                        </svg>
                      </li>
                    ))}
            </ul>
          </div>
        </div>

        <button
          className={`start-button ${startMenuOpen && "active"}`}
          onClick={() => openStartMenu()}
        >
          <div className="bevel">
            <svg className="icon" width="16" height="14">
              <use href="#windows-icon-16" />
            </svg>
            Start
          </div>
        </button>
        <div className="task-bar-items">
          {windows.map((window) => {
            if (window.taskbar !== false)
              return <TaskBarItem {...props} key={window.id} window={window} />;
          })}
        </div>
        <div className="notification-area">
          <div className="clock">{time}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskBar;

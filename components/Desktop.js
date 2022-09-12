import React, { useState, useEffect } from "react";
import useStore from "../store";
import { isTablet } from "../utils/agents";

import Icons from "../components/Icons";
import Window from "../components/Window";
import Shortcuts from "../components/Shortcuts";
import TaskBar from "../components/TaskBar";

const Desktop = (props) => {
  const windows = useStore((state) => state.windows);
  const openWindow = useStore((state) => state.openWindow);
  const hideWindow = useStore((state) => state.hideWindow);
  const maximizeWindow = useStore((state) => state.maximizeWindow);
  const unmaximizeWindow = useStore((state) => state.unmaximizeWindow);
  const toggleActiveWindow = useStore((state) => state.toggleActiveWindow);

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    startup();

    const isMobile = isTablet();
    setMobile(isMobile);
  }, []);

  function startup() {
    windows.forEach((window, i) => {
      setTimeout(function () {
        if (window.open && window.minimized && !isTablet()) {
          unminimizeWindow(window);
        }
      }, i * 1000);
    });
  }

  function beforeMinimize(window, animatedTitleBar) {
    console.log("is mobile: " + mobile)
    animatedTitleBar.style.top = mobile ? window.mobileTop : window.top;
    animatedTitleBar.style.left = mobile ? window.mobileLeft : window.left;
    animatedTitleBar.style.width = mobile ? window.mobileWidth : window.width;
  }

  function afterMinimize(taskBarItem, animatedTitleBar) {
    let taskBarRect = taskBarItem.getBoundingClientRect();
    animatedTitleBar.style.top = `${taskBarRect.top}px`;
    animatedTitleBar.style.left = `${taskBarRect.left}px`;
    animatedTitleBar.style.width = `${taskBarRect.width}px`;
  }

  function afterMaximize(animatedTitleBar) {
    animatedTitleBar.style.top = `0px`;
    animatedTitleBar.style.left = `0px`;
    animatedTitleBar.style.width = `100%`;
  }

  function minimizeWindow(window) {
    let desktop = document.querySelector(".desktop");
    let windowObject = document.getElementById(`window-${window.id}`);
    let titleBar = document.getElementById(`title-bar-${window.id}`);
    let taskBarItem = document.getElementById(`task-bar-item-${window.id}`);
    let animatedTitleBar = titleBar.cloneNode(true);

    if (windowObject.classList.contains("maximized")) {
      afterMaximize(animatedTitleBar);
    } else {
      beforeMinimize(window, animatedTitleBar);
    }
    animatedTitleBar.classList.add("animating");

    desktop.appendChild(animatedTitleBar);
    setTimeout(() => {
      afterMinimize(taskBarItem, animatedTitleBar);
      hideWindow(window.id);
    }, 1);

    animatedTitleBar.addEventListener("transitionend", () => {
      windowObject.classList.add("minimized");
      windowObject.classList.remove("active");
      taskBarItem.classList.remove("active");
      animatedTitleBar.remove();
      // TODO: select next non-minimized window
    });
  }

  function unminimizeWindow(window) {
    if (window.minimized) {
      let desktop = document.querySelector(".desktop");
      let windowObject = document.getElementById(`window-${window.id}`);
      let taskBarItem = document.getElementById(`task-bar-item-${window.id}`);
      let titleBar = document.getElementById(`title-bar-${window.id}`);
      let animatedTitleBar = titleBar.cloneNode(true);

      afterMinimize(taskBarItem, animatedTitleBar);
      animatedTitleBar.classList.add("animating");
      desktop.appendChild(animatedTitleBar);

      setTimeout(() => {
        if (windowObject.classList.contains("maximized")) {
          afterMaximize(animatedTitleBar);
        } else {
          beforeMinimize(window, animatedTitleBar);
          setTimeout(function () {
            if (animatedTitleBar) animatedTitleBar.remove();
            toggleActiveWindow(window.id);
          }, 200);
        }
      }, 1);
      animatedTitleBar.addEventListener("transitionend", () => {
        windowObject.classList.remove("minimized");
        animatedTitleBar.remove();
      });
    } else {
      toggleActiveWindow(window.id);
    }
  }

  function handleMaximizeWindow(window) {
    let desktop = document.querySelector(".desktop");
    let windowObject = document.getElementById(`window-${window.id}`);
    let titleBar = document.getElementById(`title-bar-${window.id}`);
    let animatedTitleBar = titleBar.cloneNode(true);

    beforeMinimize(window, animatedTitleBar);
    animatedTitleBar.classList.add("animating");
    desktop.appendChild(animatedTitleBar);

    setTimeout(() => {
      afterMaximize(animatedTitleBar);
      maximizeWindow(window.id);
    }, 1);
    animatedTitleBar.addEventListener("transitionend", () => {
      windowObject.classList.add("maximized");
      animatedTitleBar.remove();
    });
  }

  function handleUnmaximizeWindow(window) {
    let desktop = document.querySelector(".desktop");
    let windowObject = document.getElementById(`window-${window.id}`);
    let titleBar = document.getElementById(`title-bar-${window.id}`);
    let animatedTitleBar = titleBar.cloneNode(true);

    afterMaximize(animatedTitleBar);
    animatedTitleBar.classList.add("animating");
    desktop.appendChild(animatedTitleBar);

    setTimeout(() => {
      beforeMinimize(window, animatedTitleBar);
      unmaximizeWindow(window.id);
    }, 1);
    animatedTitleBar.addEventListener("transitionend", () => {
      windowObject.classList.remove("maximized");
      animatedTitleBar.remove();
    });
  }

  return (
    <div className="desktop">
      <div className="checkers" />
      <Icons />
      <Shortcuts openWindow={openWindow} />
      {windows.map((window) => {
        // if (window.open !== false)
        return (
          <Window
            key={window.id}
            window={window}
            minimizeWindow={minimizeWindow}
            maximizeWindow={handleMaximizeWindow}
            unmaximizeWindow={handleUnmaximizeWindow}
          />
        );
      })}
      <TaskBar unminimizeWindow={unminimizeWindow} />
    </div>
  );
};

export default Desktop;

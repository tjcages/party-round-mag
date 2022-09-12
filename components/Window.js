import React, { useRef } from "react";
import useStore from "../store";

import DefaultIcon from "./DefaultIcon";

import Mag from "./windows/mag";
import Drops from "./windows/drops";
import Vol from "./windows/vol";
import Buy from "./windows/buy";
import Terminal from "./windows/terminal";
import Logo from "./windows/logo";
import Tron from "./windows/tron";
import Pong from "./windows/pong";
import Frame from "./windows/iframe";
import Recycle from "./windows/recycle";
import ImagePage from "./windows/image";
import Page from "./windows/_default";

const Window = (props) => {
  const isActive = useStore((state) => state.windows[props.window.id].active);
  const isOpen = useStore((state) => state.windows[props.window.id].open);
  const isMinimized = useStore(
    (state) => state.windows[props.window.id].minimized
  );
  const isMaximized = useStore(
    (state) => state.windows[props.window.id].maximized
  );
  const setWindowDimensions = useStore((state) => state.setWindowDimensions);
  const toggleActiveWindow = useStore((state) => state.toggleActiveWindow);
  const closeWindow = useStore((state) => state.closeWindow);

  const windowRef = useRef();

  function dragMove(event, xMove, yMove, xSize, ySize) {
    let mouseX, mouseY;

    if (window.maximized) return;
    mouseX = event.screenX;
    mouseY = event.screenY;
    const onMove = (e) => {
      let x = e.screenX;
      let y = e.screenY;
      let dx = x - mouseX;
      let dy = y - mouseY;

      let style = getComputedStyle(windowRef.current);
      // window bounds
      let left = parseInt(style.left, 10) + dx * xMove;
      if (left < 0) left = 0;
      if (left > window.innerWidth - 200) left = window.innerWidth - 200;
      let top = parseInt(style.top, 10) + dy * yMove;
      if (top < 0) top = 0;
      if (top > window.innerHeight - 200) top = window.innerHeight - 200;

      windowRef.current.style.left = `${left}px`;
      windowRef.current.style.top = `${top}px`;
      windowRef.current.style.width = `${
        parseInt(style.width, 10) + dx * xSize
      }px`;
      windowRef.current.style.height = `${
        parseInt(style.height, 10) + dy * ySize
      }px`;

      mouseX = x;
      mouseY = y;
    };
    const onUp = () => {
      setWindowDimensions(props.window.id, windowRef.current.style);
      console.log("Remove events");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove, {
      passive: false,
    });
    window.addEventListener("mouseup", onUp, { passive: true });
  }

  const renderPage = () => {
    switch (props.window.page) {
      case "mag":
        return <Mag />;
      case "drops":
        return <Drops />;
      case "vol":
        return <Vol />;
      case "buy":
        return <Buy />;
      case "terminal":
        return <Terminal window={props.window} />;
      case "logo":
        return <Logo />;
      case "tron":
        return <Tron window={props.window} />;
      case "pong":
        return <Pong />;
      case "iframe":
        return <Frame src={props.window.src} window={props.window} />;
      case "recycle":
        return <Recycle />;
      case "image":
        return <ImagePage window={props.window} />;
      case "default":
        return <Page />;
    }
  };

  return (
    <div
      className={`window ${isActive && "active"} ${
        isOpen && !isMinimized && "open"
      }`}
      id={`window-${props.window.id}`}
      ref={windowRef}
      style={{
        left: props.window.left,
        top: props.window.top,
        width: props.window.width,
        height: props.window.height,
      }}
      onClick={() => toggleActiveWindow(props.window.id)}
    >
      <div className="frame">
        <div
          className="title-bar"
          style={{ backgroundColor: props.window.color }}
          id={`title-bar-${props.window.id}`}
          onMouseDown={(e) => dragMove(e, 1, 1, 0, 0)}
        >
          <DefaultIcon icon={props.window.icon} small />
          <div className="title">{`${props.window.title}`}</div>
          {props.window.taskbar !== false && (
            <button
              className="button minimize"
              onClick={() => props.minimizeWindow(props.window)}
            >
              <div className="bevel">
                <svg width="12" height="10">
                  <use href="#minimize-icon" />
                </svg>
              </div>
            </button>
          )}
          <button
            className="button maximize"
            onClick={() => {
              if (isMaximized) {
                props.unmaximizeWindow(props.window);
              } else {
                props.maximizeWindow(props.window);
              }
            }}
          >
            <div className="bevel">
              <svg className="maximize-icon" width="12" height="10">
                <use href="#maximize-icon" />
              </svg>
              <svg className="restore-icon" width="12" height="10">
                <use href="#restore-icon" />
              </svg>
            </div>
          </button>
          <button
            className="button close"
            onClick={() => closeWindow(props.window.id)}
          >
            <div className="bevel">
              <svg width="12" height="10">
                <use href="#close-icon" />
              </svg>
            </div>
          </button>
        </div>
        <div className="content-bevel">{renderPage()}</div>
      </div>
      <div
        className="grab n-grab"
        onMouseDown={(e) => dragMove(e, 0, 1, 0, -1)}
      ></div>
      <div
        className="grab ne-grab"
        onMouseDown={(e) => dragMove(e, 0, 1, 1, -1)}
      ></div>
      <div
        className="grab e-grab"
        onMouseDown={(e) => dragMove(e, 0, 0, 1, 0)}
      ></div>
      <div
        className="grab se-grab"
        onMouseDown={(e) => dragMove(e, 0, 0, 1, 1)}
      ></div>
      <div
        className="grab s-grab"
        onMouseDown={(e) => dragMove(e, 0, 0, 0, 1)}
      ></div>
      <div
        className="grab sw-grab"
        onMouseDown={(e) => dragMove(e, 0, 1, -1, 1)}
      ></div>
      <div
        className="grab w-grab"
        onMouseDown={(e) => dragMove(e, 1, 0, -1, 0)}
      ></div>
      <div
        className="grab nw-grab"
        onMouseDown={(e) => dragMove(e, 1, 1, -1, -1)}
      ></div>
    </div>
  );
};

export default Window;

import create from "zustand";
import { devtools } from "zustand/middleware";

const store = (set, get) => ({
  windows: [
    {
      id: 0,
      title: "Party Round Mag",
      icon: { src: "/img/computer.png" },
      color: "#DF34C9",
      page: "mag",
      selected: true,
      active: false,
      maximized: false,
      minimized: false,
      open: true,
      left: "38vw",
      top: "20px",
      width: "60vw",
      height: "80vh",
    },
    {
      id: 1,
      title: "Buy",
      icon: { src: "/img/shop.png" },
      color: "#160C3F",
      page: "buy",
      selected: false,
      active: true,
      maximized: false,
      minimized: true,
      open: true,
      left: "130px",
      top: "150px",
      width: "500px",
      height: "470px",
    },
    {
      id: 2,
      title: "VOL.001",
      icon: { src: "/img/vol.png" },
      color: "#017F7E",
      page: "vol",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "300px",
      top: "330px",
      width: "400px",
      height: "400px",
    },
    {
      id: 3,
      title: "Unreleased Drops",
      icon: { src: "/img/msagent.png" },
      color: "#222222",
      page: "drops",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      shortcut: false,
      open: false,
      left: "calc(100vw - 550px)",
      top: "calc(100vh - 470px)",
      width: "500px",
      height: "400px",
    },
    {
      id: 4,
      title: "Party Round",
      icon: { src: "/img/pr.png" },
      color: "#000000",
      page: "iframe",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "calc(100vw - 880px)",
      top: "calc(100vh - 680px)",
      width: "800px",
      height: "620px",
      src: "https://www.partyround.com/",
    },
    {
      id: 5,
      title: "Terminal",
      icon: { src: "/img/terminal.png" },
      color: "#222222",
      page: "terminal",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "50px",
      top: "calc(100vh - 350px)",
      width: "400px",
      height: "250px",
      shortcut: false,
    },
    {
      id: 6,
      title: "Party Round Mag",
      icon: { src: "/img/computer.png" },
      color: "#DF34C9",
      page: "logo",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: true,
      left: "calc(100vw - 480px)",
      top: "calc(100vh - 300px)",
      width: "400px",
      height: "230px",
      shortcut: false,
      taskbar: false,
    },
    // {
    //   id: 7,
    //   title: "Go Tron",
    //   icon: { src: "/img/joystick.png" },
    //   color: "#d53c3d",
    //   page: "tron",
    //   selected: false,
    //   active: false,
    //   maximized: false,
    //   minimized: false,
    //   open: false,
    //   left: "calc(100vw - 880px)",
    //   top: "calc(100vh - 680px)",
    //   width: "800px",
    //   height: "620px",
    //   shortcut: false,
    //   taskbar: true,
    //   experiment: true
    // },
    {
      id: 7,
      title: "Ads for Party Round",
      icon: { src: "/img/pr.png" },
      color: "#000000",
      page: "iframe",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "calc(100vw - 880px)",
      top: "calc(100vh - 680px)",
      width: "800px",
      height: "620px",
      shortcut: false,
      taskbar: true,
      experiment: true,
      href: "https://opensea.io/collection/partyroundads"
    },
    {
      id: 8,
      title: "New York Tech Week",
      icon: { src: "/img/pr.png" },
      color: "#000000",
      page: "iframe",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "calc(100vw - 880px)",
      top: "calc(100vh - 680px)",
      width: "800px",
      height: "620px",
      shortcut: false,
      taskbar: true,
      experiment: true,
      src: "https://nyctechweek.xyz/"
    },
    {
      id: 9,
      title: "Party Pong",
      icon: { src: "/img/joystick.png" },
      color: "#000000",
      page: "pong",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "20vw",
      top: "calc(100vh - 580px)",
      width: "600px",
      height: "420px",
      shortcut: false,
      taskbar: true,
      experiment: true
    },
    {
      id: 10,
      title: "Startup Supreme",
      icon: { src: "/img/pr.png" },
      color: "#000000",
      page: "iframe",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "calc(100vw - 880px)",
      top: "calc(100vh - 680px)",
      width: "800px",
      height: "620px",
      shortcut: false,
      taskbar: true,
      drop: true,
      src: "https://www.startupsupreme.xyz/lookbook"
    },
    {
      id: 11,
      title: "VC Puzzle",
      icon: { src: "/img/pr.png" },
      color: "#000000",
      page: "iframe",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "calc(100vw - 880px)",
      top: "calc(100vh - 680px)",
      width: "800px",
      height: "620px",
      shortcut: false,
      taskbar: true,
      drop: true,
      src: "https://vcpuzzle.com/"
    },
    {
      id: 12,
      title: "Poached Eggs",
      icon: { src: "/img/pr.png" },
      color: "#000000",
      page: "iframe",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "calc(100vw - 880px)",
      top: "calc(100vh - 680px)",
      width: "800px",
      height: "620px",
      shortcut: false,
      taskbar: true,
      drop: true,
      src: "https://poached.xyz/"
    },
    {
      id: 13,
      title: "Party Grounds",
      icon: { src: "/img/pr.png" },
      color: "#000000",
      page: "iframe",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "calc(100vw - 880px)",
      top: "calc(100vh - 680px)",
      width: "800px",
      height: "620px",
      shortcut: false,
      taskbar: true,
      drop: true,
      src: "https://partygrounds.com/"
    },
    {
      id: 14,
      title: "BIGTECH Fellowship",
      icon: { src: "/img/pr.png" },
      color: "#000000",
      page: "iframe",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "calc(100vw - 880px)",
      top: "calc(100vh - 680px)",
      width: "800px",
      height: "620px",
      shortcut: false,
      taskbar: true,
      drop: true,
      src: "https://bigtechfellowship.com/"
    },
    {
      id: 15,
      title: "Burn The Runway",
      icon: { src: "/img/pr.png" },
      color: "#000000",
      page: "iframe",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "calc(100vw - 880px)",
      top: "calc(100vh - 680px)",
      width: "800px",
      height: "620px",
      shortcut: false,
      taskbar: true,
      drop: true,
      src: "https://burntherunway.com/"
    },
    {
      id: 16,
      title: "Helpful VCs",
      icon: { src: "/img/pr.png" },
      color: "#000000",
      page: "iframe",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "calc(100vw - 880px)",
      top: "calc(100vh - 680px)",
      width: "800px",
      height: "620px",
      shortcut: false,
      taskbar: true,
      drop: true,
      src: "https://helpfulvcs.com/"
    },
    {
      id: 17,
      title: "Startup Ipsum",
      icon: { src: "/img/pr.png" },
      color: "#000000",
      page: "iframe",
      selected: false,
      active: false,
      maximized: false,
      minimized: false,
      open: false,
      left: "calc(100vw - 880px)",
      top: "calc(100vh - 680px)",
      width: "800px",
      height: "620px",
      shortcut: false,
      taskbar: true,
      drop: true,
      src: "https://startipsum.com/"
    },

  ],
  setWindowDimensions: (id, { top, left, width, height }) => {
    let newWindows = get().windows;
    newWindows[id].top = top;
    newWindows[id].left = left;
    newWindows[id].width = width;
    newWindows[id].height = height;
    set((state) => ({ windows: newWindows }));
  },
  toggleActiveWindow: (id) => {
    let newWindows = get().windows;
    newWindows.forEach((window) => (window.active = false));
    newWindows[id].active = true;
    newWindows[id].minimized = false;

    set((state) => ({ windows: newWindows }));
  },
  openWindow: (id) => {
    let newWindows = get().windows;

    if (!newWindows[id].open) {
      newWindows[id].open = true;
    }

    set((state) => ({ windows: newWindows }));
    get().unselectAll(id);
  },
  closeWindow: (id) => {
    let newWindows = get().windows;
    newWindows[id].open = false;
    newWindows[id].minimized = false;
    newWindows[id].maximized = false;
    get().unselectAll();
    set((state) => ({ windows: newWindows }));
  },
  hideWindow: (id) => {
    let newWindows = get().windows;
    newWindows[id].minimized = true;
    get().unselectAll();
    set((state) => ({ windows: newWindows }));
  },
  maximizeWindow: (id) => {
    let newWindows = get().windows;
    newWindows[id].maximized = true;
    set((state) => ({ windows: newWindows }));
  },
  unmaximizeWindow: (id) => {
    let newWindows = get().windows;
    newWindows[id].maximized = false;
    set((state) => ({ windows: newWindows }));
  },
  toggleSelectedShortcut: (id) => {
    let newWindows = get().windows;
    newWindows.forEach((shortcut) => (shortcut.selected = false));
    newWindows[id].selected = !newWindows[id].selected;
    set((state) => ({ windows: newWindows }));
  },
  unselectAll: (but = -1) => {
    let newShortcuts = get().windows;
    newShortcuts.forEach((shortcut) => (shortcut.selected = false));
    set((state) => ({ windows: newShortcuts }));
    let newWindows = get().windows;
    if (but > -1) {
      newWindows.forEach((window) => (window.active = window.id == but));
    } else {
      newWindows.forEach((window) => (window.active = false));
    }
    set((state) => ({ windows: newWindows }));
  },
});

// allows the use of the redux devtools extension with zustand
const useStore = create(devtools(store));

export default useStore;

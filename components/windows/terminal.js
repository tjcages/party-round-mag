import React, { Component } from "react";
import styles from "../../styles/terminal.module.scss";

const ENTER_KEY = 13;
const fileSystem = {
  "README.md": `Welcome to the Party Round Magintosh 128K terminal!
Supported commands are:
  - ls: list directory contents
  - buy: initiate a purchase
  - clear: clear the terminal screen 

  Type #'buy mag'# below to purchase a Party Round Mag.
`,
  "secret1.txt": `Shhhh!`,
  "secret2.txt": `Zip it!`,
  mag: `
██████╗ ██╗   ██╗██╗   ██╗    ███╗   ███╗ █████╗  ██████╗ 
██╔══██╗██║   ██║╚██╗ ██╔╝    ████╗ ████║██╔══██╗██╔════╝ 
██████╔╝██║   ██║ ╚████╔╝     ██╔████╔██║███████║██║  ███╗
██╔══██╗██║   ██║  ╚██╔╝      ██║╚██╔╝██║██╔══██║██║   ██║
██████╔╝╚██████╔╝   ██║       ██║ ╚═╝ ██║██║  ██║╚██████╔╝
╚═════╝  ╚═════╝    ╚═╝       ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝

Please enter your #full name:#
`,
};
const confirm = `
██████╗ ██████╗ ███╗   ██╗███████╗██╗██████╗ ███╗   ███╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔══██╗████╗ ████║
██║     ██║   ██║██╔██╗ ██║█████╗  ██║██████╔╝██╔████╔██║
██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██╔══██╗██║╚██╔╝██║
╚██████╗╚██████╔╝██║ ╚████║██║     ██║██║  ██║██║ ╚═╝ ██║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝
`;
const success = `
███████╗██╗   ██╗ ██████╗ ██████╗███████╗███████╗███████╗
██╔════╝██║   ██║██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝
███████╗██║   ██║██║     ██║     █████╗  ███████╗███████╗
╚════██║██║   ██║██║     ██║     ██╔══╝  ╚════██║╚════██║
███████║╚██████╔╝╚██████╗╚██████╗███████╗███████║███████║
╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝╚══════╝╚══════╝╚══════╝

#CONGRATS!#
Your copy of Party Round Mag will be shipped shortly.
`;

export default class Terminal extends Component {
  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.addHistory = this.addHistory.bind(this);
    this.listFiles = this.listFiles.bind(this);
    this.catFile = this.catFile.bind(this);
    this.buyFile = this.buyFile.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);

    this.state = {
      inited: false,
      allowEditing: true,
      buying: false,
      name: null,
      shipping: null,
      ccNumber: null,
      expDate: null,
      csv: null,
    };
  }

  componentDidUpdate(props) {
    if (this.props.window.open && !this.state.inited) {
      this.setState({ inited: true });
      this.init();
    }
  }

  init() {
    this.history = [];
    this.elements = {
      input: document.querySelector("#input"),
      terminal: document.querySelector("#content"),
      outputContainer: document.querySelector("#outputContainer"),
    };
    this.prompt = "$";
    this.commands = {
      clear: this.clearHistory,
      ls: this.listFiles,
      cat: this.catFile,
      buy: this.buyFile,
    };
    this.elements.input.addEventListener("keydown", this.onKeyDown);
    this.catFile("README.md");
  }

  clearHistory() {
    this.history = [];
    this.elements.outputContainer.innerHTML = "";
  }

  catFile(fileName) {
    if (fileName in fileSystem && fileName !== "mag")
      this.addHistory(fileSystem[fileName]);
    else this.addHistory(`cat: ${fileName}: No such file or directory`);
  }

  buyFile(fileName) {
    if (fileName in fileSystem) {
      this.addHistory(fileSystem[fileName]);
      this.setState({ buying: true });
    } else
      this.addHistory(`buy: ${fileName}: No such product or drop for sale`);
  }

  purchaseRequest() {
    this.setState({ allowEditing: false });
    var response = null;
    setTimeout(function () {
      response = 1;
    }, 4000);
    var that = this;
    const interval = setInterval(function () {
      if (response == null) that.addHistory(`...`);
      else {
        clearInterval(interval);
        that.addHistory(success);
        that.setState({ allowEditing: true });
      }
      that.scrollToBottom();
    }, 1000);
  }

  scrollToBottom() {
    var that = this;
    setTimeout(function () {
      that.elements.terminal.scrollTop = that.elements.terminal.scrollHeight;
    }, 1);
  }

  addHistory(output) {
    this.history.push(output);

    let outputSpan = document.createElement("span");
    outputSpan.classList.add(styles.outputSpan);
    const outputArray = output.split("#");
    outputArray.forEach((item, i) => {
      let outputEl = document.createElement("pre");
      const outputText = document.createTextNode(item);
      outputEl.classList.add(styles.output);
      if (outputArray.length > 1) outputEl.classList.add(styles.outputInline);
      if (i == 1) outputEl.classList.add(styles.highlight);
      outputEl.appendChild(outputText);
      outputSpan.appendChild(outputEl);
    });

    this.elements.outputContainer.appendChild(outputSpan);
  }

  listFiles(dir) {
    const output = Object.keys(fileSystem).reduce((acc, curr, index) => {
      const deliminator = index % 3 === 0 && index !== 0 ? "\n" : "\t";
      return `${acc}${curr}${deliminator}`;
    }, "");

    this.addHistory(output);
  }

  clearInput() {
    this.elements.input.value = "";
  }

  onKeyDown(e) {
    // Only respond to Enter key presses
    if (e.keyCode !== ENTER_KEY) return;
    if (!this.state.allowEditing) return;

    const inputText = this.elements.input.value.toLowerCase();
    const inputArray = inputText.split(" ");
    const inputCommand = inputArray[0];
    const arg = inputArray[1];

    this.addHistory(`${this.prompt} ${inputText}`);
    this.clearInput();
    this.scrollToBottom();

    /* If the command line was empty, stop. 
       We don't want to interpret it as a command.
       It's fine to feed a lint to the terminal */
    if (inputCommand === "") return;

    // If in the buying state, change responses & save input
    if (this.state.buying) {
      // determine which field is next
      if (this.state.name == null) {
        this.setState({ name: inputText });
        this.addHistory(`Please enter your full #shipping address:#`);
      } else if (this.state.address == null) {
        this.setState({ address: inputText });
        this.addHistory(`Please enter your #credit card number:#`);
      } else if (this.state.ccNumber == null) {
        this.setState({ ccNumber: inputText });
        this.addHistory(`Please enter your #expiration date as MM/YY:#`);
      } else if (this.state.expDate == null) {
        this.setState({ expDate: inputText });
        this.addHistory(`Please enter your #security code:#`);
      } else if (this.state.csv == null) {
        this.setState({ csv: inputText });
        this.addHistory(confirm);
        this.addHistory(
          `Ship 1 Party Round Mag to #${this.state.address} for $0.99#
          
          `
        );
        this.addHistory(`Type #'enter'# to confirm!`);
      } else if (inputText == "enter") {
        this.addHistory(`Buying...`);
        this.purchaseRequest();
        this.setState({ buying: false });
      } else this.addHistory(`sh: command not found: ${inputCommand}`);
      return;
    }

    const command = this.commands[inputCommand];

    if (command) command(arg);
    else this.addHistory(`sh: command not found: ${inputCommand}`);
  }

  render() {
    return this.props.window.open ? (
      <div id="content" className={styles.content}>
        <div className={styles.bezel} onClick={() => this.elements.input.focus()}>
          <div
            id="terminal"
            className={styles.terminal}
          >
            <div id="outputContainer" className={styles.outputContainer}></div>
            <div className={styles.currentLine}>
              <span className={styles.prompt}>$</span>
              <div className={styles.inputContainer}>
                <input
                  id="input"
                  className={styles.input}
                  type="text"
                  autoFocus={true}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

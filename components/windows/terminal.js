import React, { Component } from "react";
import styles from "../../styles/terminal.module.scss";

const ENTER_KEY = 13;
const fileSystem = {
  "readme.md": `Welcome to the Party Round Magintosh 128K terminal!
Supported commands are:
  - ls: list directory contents
  - buy: initiate a purchase
  - clear: clear the terminal screen 

Type #'buy mag'# below to purchase a Party Round Mag.
`,
  "secret1.txt": `Shhhh!`,
  "secret2.txt": `Zip it!`,
  mag: `* 
██████╗ ██╗   ██╗██╗   ██╗    ███╗   ███╗ █████╗  ██████╗ 
██╔══██╗██║   ██║╚██╗ ██╔╝    ████╗ ████║██╔══██╗██╔════╝ 
██████╔╝██║   ██║ ╚████╔╝     ██╔████╔██║███████║██║  ███╗
██╔══██╗██║   ██║  ╚██╔╝      ██║╚██╔╝██║██╔══██║██║   ██║
██████╔╝╚██████╔╝   ██║       ██║ ╚═╝ ██║██║  ██║╚██████╔╝
╚═════╝  ╚═════╝    ╚═╝       ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ *

`,
};
const confirm = `*
██████╗ ██████╗ ███╗   ██╗███████╗██╗██████╗ ███╗   ███╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔══██╗████╗ ████║
██║     ██║   ██║██╔██╗ ██║█████╗  ██║██████╔╝██╔████╔██║
██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██╔══██╗██║╚██╔╝██║
╚██████╗╚██████╔╝██║ ╚████║██║     ██║██║  ██║██║ ╚═╝ ██║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝*

`;
const success = `*
███████╗██╗   ██╗ ██████╗ ██████╗███████╗███████╗███████╗
██╔════╝██║   ██║██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝
███████╗██║   ██║██║     ██║     █████╗  ███████╗███████╗
╚════██║██║   ██║██║     ██║     ██╔══╝  ╚════██║╚════██║
███████║╚██████╔╝╚██████╗╚██████╗███████╗███████║███████║
╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝╚══════╝╚══════╝╚══════╝*

`;

const inputConfig = {
  default: {
    id: "input",
    type: "text",
    autoComplete: "off",
    inputMode: "text",
    pattern: "regexp",
    maxLength: "100",
    placeholder: "",
  },
  name: {
    id: "name",
    type: "text",
    autoComplete: "name",
    inputMode: "text",
    pattern: "regexp",
    maxLength: "100",
    placeholder: "josh appleseed",
  },
  email: {
    id: "email",
    type: "email",
    autoComplete: "home email",
    inputMode: "email",
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
    maxLength: "100",
    placeholder: "josh@partyround.com",
  },
  address: {
    id: "address",
    type: "text",
    autoComplete: "billing street-address",
    inputMode: "text",
    pattern: "regexp",
    maxLength: "100",
    placeholder: "335 Madison Ave New York, NY 10017",
  },
  cc: {
    id: "cc",
    type: "tel",
    autoComplete: "cc-number",
    inputMode: "text",
    pattern: "[0-9s]{13,19}",
    maxLength: "19",
    placeholder: "XXXX XXXX XXXX XXXX",
  },
  exp: {
    id: "exp",
    type: "numeric",
    autoComplete: "cc-exp",
    inputMode: "text",
    pattern: "(0[1-9]|1[0-2])/[0-9]{2}",
    maxLength: "5",
    placeholder: "XX/XX",
  },
  csv: {
    id: "csv",
    type: "numeric",
    autoComplete: "cc-csc",
    inputMode: "text",
    pattern: "regexp",
    maxLength: "4",
    placeholder: "XXX",
  },
};

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
    this.enterFolder = this.enterFolder.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);

    this.state = {
      inited: false,
      allowEditing: true,
      buying: false,
      name: null,
      email: null,
      shipping: null,
      ccNumber: null,
      expDate: null,
      csv: null,
      config: inputConfig["default"],
    };
  }

  componentDidUpdate(props) {
    if (this.props.window.open && !this.state.inited) {
      this.setState({ inited: true });
      this.init();
    } else if (!this.props.window.open && this.state.inited) {
      this.setState({
        inited: false,
        allowEditing: true,
        buying: false,
        name: null,
        shipping: null,
        ccNumber: null,
        expDate: null,
        csv: null,
      });
    } 
    if (this.elements && this.elements.input) {
      this.elements.input.blur();
      setTimeout(() => {
        this.elements.input.focus();
      }, 10)
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
      cd: this.enterFolder,
    };
    this.elements.input.addEventListener("keydown", this.onKeyDown);
    this.catFile("readme.md");
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
      this.addHistory(`Please enter your #full name:#`);
      this.setState({ buying: true, config: inputConfig["name"] });
    } else
      this.addHistory(`buy: ${fileName}: No such product or drop for sale`);
  }

  enterFolder(fileName) {}

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
        that.addHistory(`
#CONGRATS!#
Your copy of Party Round Mag will be shipped shortly.
        `);
      }
      that.scrollToBottom();
    }, 1000);
  }

  resetInput() {
    this.setState({
      allowEditing: true,
      buying: false,
      name: null,
      email: null,
      shipping: null,
      ccNumber: null,
      expDate: null,
      csv: null,
    });
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

    if (output.includes("#")) {
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
    } else if (output.includes("*")) {
      const outputArray = output.split("*");
      outputArray.forEach((item, i) => {
        let outputEl = document.createElement("pre");
        const outputText = document.createTextNode(item);
        outputEl.classList.add(styles.output);
        if (outputArray.length > 1) outputEl.classList.add(styles.outputInline);
        if (i == 1) outputEl.classList.add(styles.shrink);
        outputEl.appendChild(outputText);
        outputSpan.appendChild(outputEl);
      });
    } else {
      let outputEl = document.createElement("pre");
      const outputText = document.createTextNode(output);
      outputEl.classList.add(styles.output);
      outputEl.appendChild(outputText);
      outputSpan.appendChild(outputEl);
    }

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
        this.setState({ name: inputText, config: inputConfig["email"] });
        this.addHistory(`Please enter your #email:#`);
      } else if (this.state.email == null) {
        this.setState({ email: inputText, config: inputConfig["address"] });
        this.addHistory(`Please enter your full #shipping address:#`);
      } else if (this.state.address == null) {
        this.setState({ address: inputText, config: inputConfig["cc"] });
        this.addHistory(`Please enter your #credit card number:#`);
      } else if (this.state.ccNumber == null) {
        this.setState({ ccNumber: inputText, config: inputConfig["exp"] });
        this.addHistory(`Please enter your #expiration date as MM/YY:#`);
      } else if (this.state.expDate == null) {
        this.setState({ expDate: inputText, config: inputConfig["csv"] });
        this.addHistory(`Please enter your #security code:#`);
      } else if (this.state.csv == null) {
        this.setState({ csv: inputText, config: inputConfig["default"] });
        this.addHistory(confirm);
        this.addHistory(
          `Ship 1 Party Round Mag to #${this.state.address} for $0.99#
          
          `
        );
        this.addHistory(`Type #'enter'# to confirm!`);
      } else if (inputText == "enter") {
        this.addHistory(`Buying...`);
        this.purchaseRequest();
        this.resetInput();
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
        <div
          className={styles.bezel}
          onClick={() => this.elements.input.focus()}
        >
          <div id="terminal" className={styles.terminal}>
            <div id="outputContainer" className={styles.outputContainer}></div>
            <div className={styles.currentLine}>
              <span className={styles.prompt}>$</span>
              <div className={styles.inputContainer}>
                <input
                  id={this.state.config.id}
                  className={styles.input}
                  autoFocus={true}
                  type={this.state.config.type}
                  inputMode={this.state.config.inputMode}
                  pattern={this.state.config.pattern}
                  autoComplete={this.state.config.autoComplete}
                  maxLength={this.state.config.maxLength}
                  placeholder={this.state.config.placeholder}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

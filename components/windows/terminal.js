import React, { Component, createRef } from "react";
import styles from "../../styles/terminal.module.scss";
import { isTablet } from "../../utils/agents";
import {
  createUser,
  createStripeCustomer,
  createFirestoreOrder,
} from "../../pages/api";

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
    type: "cc-number",
    autoComplete: "cc-number",
    inputMode: "text",
    pattern: "[0-9s]{13,19}",
    maxLength: "19",
    placeholder: "XXXX XXXX XXXX XXXX",
  },
  exp: {
    id: "exp",
    type: "text",
    autoComplete: "cc-exp",
    inputMode: "text",
    pattern: "regexp",
    maxLength: "5",
    placeholder: "XX/XX",
  },
  csc: {
    id: "csv",
    type: "cc-csv",
    autoComplete: "cc-csc",
    inputMode: "text",
    pattern: "regexp",
    maxLength: "5",
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
    this.selectInput = this.selectInput.bind(this);
    this.detectFocus = this.detectFocus.bind(this);

    this.state = {
      inited: false,
      allowEditing: true,
      buying: false,
      id: null,
      name: null,
      email: null,
      address: null,
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
        id: null,
        name: null,
        address: null,
        ccNumber: null,
        expDate: null,
        csv: null,
        config: inputConfig["default"],
      });
    }
  }

  init() {
    this.history = [];
    this.elements = {
      defaultInput: createRef(),
      ccInput: createRef(),
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
    this.setState({ buying: false, config: inputConfig["default"] });
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
      if (this.props.soldout) {
        this.addHistory(`buy: ${fileName}: SOLD OUT`);
      } else {
        this.addHistory(fileSystem[fileName]);
        this.addHistory(`Please enter your #full name:#`);
        this.setState({ buying: true, config: inputConfig["name"] });
      }
    } else
      this.addHistory(`buy: ${fileName}: No such product or drop for sale`);
  }

  enterFolder(fileName) {}

  purchaseRequest() {
    if (this.props.soldout) {
      this.addHistory(`PARTY ROUND MAG SOLD OUT`);
      this.resetInput();
      return;
    }

    this.setState({ allowEditing: false });
    var response = null;

    createStripeCustomer(this.state).then((res) => {
      // create a new order in Firestore
      const order = {
        id: this.state.id,
        email: this.state.email,
        name: this.state.name,
        address: this.state.address,
        customer: res.customer,
        timestamp: new Date(),
      };
      createFirestoreOrder(order);

      response = res;
    });

    var that = this;
    const interval = setInterval(function () {
      if (response == null) that.addHistory(`...`);
      else if (response.status == "success") {
        clearInterval(interval);
        that.addHistory(success);
        that.addHistory(`
#CONGRATS!#
Your copy of Party Round Mag will be shipped shortly.
        `);
        that.resetInput();
      } else {
        clearInterval(interval);
        that.addHistory(
          "There was an error processing your order, please try again."
        );
        if (response.error) {
          that.addHistory(response.error);
        }
        that.resetInput();
      }
      that.scrollToBottom();

      const isMobile = isTablet();
      if (isMobile) {
        if (that.elements.defaultInput.current) {
          that.elements.defaultInput.current.value = "";
          that.elements.defaultInput.current.blur();
        }
        if (that.elements.ccInput.current) {
          that.elements.ccInput.current.value = "";
          that.elements.ccInput.current.blur();
        }
      }
    }, 1000);
  }

  resetInput() {
    this.setState({
      allowEditing: true,
      buying: false,
      id: null,
      name: null,
      email: null,
      address: null,
      ccNumber: null,
      expDate: null,
      csv: null,
      config: inputConfig["default"],
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
    this.scrollToBottom();
  }

  listFiles(dir) {
    const output = Object.keys(fileSystem).reduce((acc, curr, index) => {
      const deliminator = index % 3 === 0 && index !== 0 ? "\n" : "\t";
      return `${acc}${curr}${deliminator}`;
    }, "");

    this.addHistory(output);
  }

  clearInput() {
    if (this.elements.defaultInput.current)
      this.elements.defaultInput.current.value = "";
    if (this.elements.ccInput.current) this.elements.ccInput.current.value = "";
  }

  detectFocus() {
    if (this.elements.defaultInput.current)
      this.elements.defaultInput.current.focus();
    if (this.elements.ccInput.current) this.elements.ccInput.current.focus();
  }

  onKeyDown(e) {
    // Only respond to Enter key presses
    if (e.keyCode !== ENTER_KEY) return;
    if (!this.state.allowEditing) return;

    const inputText = e.target.value.toLowerCase();
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
        this.addHistory("...");
        // authenticate the user with email
        createUser(inputText).then(({ user, state }) => {
          if (state == "success") {
            this.setState({
              id: user.uid,
              email: inputText,
              config: inputConfig["address"],
            });
            this.addHistory(`Please enter your full #shipping address:#`);
          } else {
            this.addHistory(`Email invalid, please try again.`);
            this.addHistory(`Please enter your #email:#`);
          }
        });
      } else if (this.state.address == null) {
        this.setState({ address: inputText, config: inputConfig["cc"] });
        this.addHistory(`Please enter your #credit card number:#`);
      } else if (this.state.ccNumber == null) {
        this.setState({ ccNumber: inputText, config: inputConfig["exp"] });
        this.addHistory(`Please enter your #expiration date as MM/YY:#`);
      } else if (this.state.expDate == null) {
        this.setState({ expDate: inputText, config: inputConfig["csc"] });
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
        <div className={styles.bezel} onClick={() => this.detectFocus()}>
          <div id="terminal" className={styles.terminal}>
            <div id="outputContainer" className={styles.outputContainer}></div>
            <div className={styles.currentLine}>
              <span className={styles.prompt}>$</span>
              <div className={styles.inputContainer}>
                {this.selectInput(this.state.config)}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }

  selectInput(config) {
    switch (config.id) {
      case "cc":
        return (
          <>
            <label className={styles.hiddenLabel} htmlFor="cardNumber">
              Card Number
            </label>
            <input
              ref={this.elements && this.elements.ccInput}
              name="cardNumber"
              id="cardNumber"
              className={styles.input}
              type="regexp"
              autoFocus={true}
              autoComplete="cc-number"
              inputMode="text"
              pattern="[0-9s]{13,19}"
              maxLength="19"
              placeholder="XXXX XXXX XXXX XXXX"
              onKeyDown={(e) => this.onKeyDown(e)}
            />
          </>
        );
      default:
        return (
          <input
            ref={this.elements && this.elements.defaultInput}
            title={config.id}
            id={config.id}
            className={styles.input}
            autoFocus={true}
            type={config.type}
            inputMode={config.inputMode}
            pattern={config.pattern}
            autoComplete={config.autoComplete}
            maxLength={config.maxLength}
            placeholder={config.placeholder}
            onKeyDown={(e) => this.onKeyDown(e)}
          />
        );
    }
  }
}

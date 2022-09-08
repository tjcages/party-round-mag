import React, { Component } from "react";
import styles from "../../styles/terminal.module.scss";

const ENTER_KEY = 13;
const fileSystem = {
  "README.md": `Welcome to the Party Round Magintosh 128K terminal!
Supported commands are:
  - ls: list directory contents
  - cat: concatenate and print files
  - clear: clear the terminal screen 
`,
  "secret1.txt": `Shhhh!`,
  "secret2.txt": `Zip it!`,
};

export default class Terminal extends Component {
  constructor() {
    super();

    this.state = {
      didInit: false,
    };

    this.init = this.init.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.addHistory = this.addHistory.bind(this);
    this.listFiles = this.listFiles.bind(this);
    this.catFile = this.catFile.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    // only allow single init
    if (!this.state.didInit) {
      this.init();
      this.setState({ didInit: true });
      return;
    }
  }

  init() {
    this.history = [];
    this.elements = {
      input: document.querySelector("#input"),
      terminal: document.querySelector("#terminal"),
      outputContainer: document.querySelector("#outputContainer"),
    };
    this.prompt = "$";
    this.commands = {
      clear: this.clearHistory,
      ls: this.listFiles,
      cat: this.catFile,
    };
    this.elements.input.addEventListener("keydown", this.onKeyDown);
    this.catFile("README.md");
  }

  clearHistory() {
    this.history = [];
    this.elements.outputContainer.innerHTML = "";
  }

  catFile(fileName) {
    if (fileName in fileSystem) this.addHistory(fileSystem[fileName]);
    else this.addHistory(`cat: ${fileName}: No such file or directory`);
  }

  scrollToBottom() {
    this.elements.terminal.scrollTop = this.elements.terminal.scrollHeight;
  }

  addHistory(output) {
    this.history.push(output);

    var outputText = document.createTextNode(output);
    let outputEl = document.createElement("pre");

    outputEl.classList.add("output");
    outputEl.appendChild(outputText);

    this.elements.outputContainer.appendChild(outputEl);
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

    const inputText = this.elements.input.value;
    const inputArray = inputText.split(" ");
    const inputCommand = inputArray[0];
    const arg = inputArray[1];

    this.addHistory(`${this.prompt} ${inputText}`);
    this.clearInput();

    /* If the command line was empty, stop. 
       We don't want to interpret it as a command.
       It's fine to feed a lint to the terminal */
    if (inputCommand === "") return;

    const command = this.commands[inputCommand];

    if (command) command(arg);
    else this.addHistory(`sh: command not found: ${inputCommand}`);

    this.scrollToBottom();
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.bezel}>
          <div id="terminal" className={styles.terminal}>
            <div id="outputContainer" className={styles.outputContainer}></div>
            <div className={styles.currentLine}>
              <span className={styles.prompt}>$</span>
              <div className={styles.inputContainer}>
                <input
                  id="input"
                  className={styles.input}
                  type="text"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const Terminal = (props) => {

//   return (
//     <div className={styles.content}>
//       <div className={styles.bezel}>
//         <div className={styles.terminal}>
//           <p>root@partyround</p>
//           <p>
//             Updating <span className={styles.highlight}>Party Round</span> to
//             latest version...
//           </p>
//           <p>
//             → <span className={styles.highlight}>mag </span>
//             <span className={styles.editable}>▯</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Terminal;

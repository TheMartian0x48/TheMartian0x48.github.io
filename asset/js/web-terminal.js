var myydata = JSON.parse('{"user":"martian","root":{"name":"/","link":"https://themartian0x48.github.io/index.html","files":[["blog","https://themartian0x48.github.io/pages/blog.html"],["project","https://themartian0x48.github.io/pages/project.html"],["resume","https://themartian0x48.github.io/pages/resume.html"],["about","https://themartian0x48.github.io/pages/about.html"]],"children":[{"name":"adventure","link":"https://themartian0x48.github.io/pages/adventure.html","files":[["Project-Euler","https://themartian0x48.github.io/pages/adventure/project-euler.html"],["Bandit-by-OverTheWire","https://themartian0x48.github.io/pages/adventure.html"]],"children":[{"name":"project-euler","link":"https://themartian0x48.github.io/pages/adventure/project-euler.html","files":[],"children":[]}]}]}}');
var  mydata = "";

class TreeNode {
  constructor() {
    this.parent = null;
    this.name = '';
    this.link = '';
    this.files = [
    ];
    this.children = [
    ];
  }
}
class Tree {
  constructor() {
    this.root = null;
    this.pwd = null;
  }
  createTree1(data, parent = null) {
    let node = new TreeNode();
    node.parent = parent;
    node.name = data['name'];
    node.link = data['link'];
    node.files = data['files'];
    for (let i = 0; i < data['children'].length; i++) {
      node.children.push(this.createTree1(data.children[i], node));
    }
    return node;
  }
  createTree(data) {
    this.root = this.createTree1(data, null);
    this.pwd = this.root;
  }
  traverse1() {
    let res = this.traverse(this.root);
    let div = document.getElementById('tree');
    div.appendChild(res);
  }
  traverse(root) {
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    li.innerHTML = 'name : ' + root.name;
    ul.appendChild(li);
    li = document.createElement('li');
    li.innerHTML = 'link : ' + root.link;
    ul.appendChild(li);
    for (let i = 0; i < root.files.length; i++) {
      let li1 = document.createElement('li');
      li1.innerHTML = 'name : ' + root.files[i][0] + ' link : ' + root.files[i][1];
      ul.appendChild(li1);
    }
    for (let i = 0; i < root.children.length; i++) {
      ul.appendChild(this.traverse(root.children[i]));
    }
    return ul;
  }
}
class Command {
  constructor(name, errorMessage = '') {
    this.name = name;
    this.errorMessage = errorMessage;
  }
  execute(parameter) {
    console.log('super');
  }
  getName() {
    return this.name;
  }
  getErrorMessage() {
    let terminal = document.getElementById('web-terminal-window');
    let div = document.createElement('div');
    div.setAttribute('id', 'web-terminal-error-result');
    let p = document.createElement('p');
    p.innerHTML = this.errorMessage;
    div.appendChild(p);
    terminal.appendChild(div);
  }
}
class WebTerminal {
  constructor(user) {
    this.user = user;
    this.filesystem = new Tree();
    this.commands = new Map();
  }
  init(config) {
    this.user = config['user'];
    this.createTree(config['root']);
  }
  createTree(filesystem) {
    this.filesystem.createTree(filesystem);
  }
  addCommand(command) {
    this.commands.set(command.getName(), command);
  }
  errorMessage(message) {
    let terminal = document.getElementById('web-terminal-window');
    let div = document.createElement('div');
    div.setAttribute('id', 'web-terminal-error-result');
    let p = document.createElement('p');
    p.innerHTML = message;
    div.appendChild(p);
    terminal.appendChild(div);
  }
  removeCommad(command) {
    if (this.commands.has(command)) {
      this.commands.delete(command);
    }
  }
  createCommandBox() {
    let div = document.createElement('div');
    div.setAttribute('id', 'web-terminal-command-box');
    let span = document.createElement('span');
    span.setAttribute('id', 'web-terminal-user');
    span.innerHTML = this.user + ' >>';
    let input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('id', 'web-terminal-command');
    div.appendChild(span);
    div.appendChild(input);
    let terminal = document.getElementById('web-terminal-window');
    terminal.appendChild(div);
    input.focus();
    document.getElementById('web-terminal-command').addEventListener('keyup', (event) => {
      if (event.code == 'Enter') {
        this.executeCommand();
      }
    });
  }
  replaceCommandbox(command) {
    let div = document.createElement('div');
    div.setAttribute('class', 'web-terminal-command-history');
    let userSpan = document.createElement('span');
    userSpan.setAttribute('class', 'web-terminal-user');
    userSpan.innerHTML = this.user + ' >>';
    let commandSpan = document.createElement('span');
    commandSpan.setAttribute('class', 'web-terminal-command');
    commandSpan.innerHTML = command;
    div.appendChild(userSpan);
    div.appendChild(commandSpan);
    let terminal = document.getElementById('web-terminal-window');
    terminal.removeChild(terminal.childNodes[terminal.childNodes.length - 1]);
    terminal.appendChild(div);
  }
  validCommad(command) {
    return this.commands.has(command);
  }
  executeCommand() {
    let command = (document.getElementById('web-terminal-command')).value;
    this.replaceCommandbox(command);
    command = command.trim().split(' ');
    console.log(command);
    if (command.length == 0 || this.validCommad(command[0]) == false) {
      this.errorMessage('This is not a valid command');
      this.createCommandBox();
      return;
    }
    this.commands.get(command[0]).execute(this.filesystem, command);
    this.createCommandBox();
  }
}
class Ls extends Command {
  constructor() {
    super("ls", "Wrong parameters, use `help` for help");
  }
  getResult(pwd) {
    let terminal = document.getElementById('web-terminal-window');
    let div = document.createElement('div');
    div.setAttribute('id', 'web-terminal-success-result');

    for (let i = 0; i < pwd.files.length; i++) {
      let a = document.createElement("a");
      a.innerHTML = pwd.files[i][0];
      a.href = pwd.files[i][1];
      a.target = "_blank";
      div.appendChild(a);
    }
    for (let i = 0; i < pwd.children.length; i++) {
      let a = document.createElement("a");
      a.innerHTML = "<i>" + pwd.children[i]["name"] + "</i>";
      a.href = pwd.children[i]["link"];
      a.target = "_blank";
      div.appendChild(a);
    }
    terminal.appendChild(div);
  }
  execute(filesystem, command) {
    if (command.length != 1) {
      this.getErrorMessage();
      return;
    }
    this.getResult(filesystem.pwd);
  }
}
class Open extends Command {
  constructor() {
    super("open", "open takes only one parameter");
  }
  execute(filesystem, command) {
    if (command.length != 2) {
      this.errorMessage = "open takes only one parameter";
      this.getErrorMessage();
      return;
    }
    for (let i = 0; i < filesystem.pwd.files.length; i++) {
      if (filesystem.pwd.files[i][0] == command[1]) {
        window.open(filesystem.pwd.files[i][1], "_blank");
        return;
      }
    }
    for (let i = 0; i < filesystem.pwd.children.length; i++) {
      if (filesystem.pwd.children[i]["name"] == command[1]) {
        window.open(filesystem.pwd.children[i]["link"], "_target");
        return;
      }
    }
    this.errorMessage = "invalid parameter";
    this.getErrorMessage();
  }
}
class Cd extends Command {
  constructor() {
    super("cd", "");
  }
  execute(filesystem, command) {
    if (command.length != 2) {
      this.errorMessage = "cd takes only one parameter.";
      this.getErrorMessage();
      return;
    }
    let path = command[1].trim().split('/');
    console.log(path);

    let current_path = filesystem.pwd;
    for (let i = 0; i < path.length; i++) {
      if (path[i] == "." || path[i] == "") continue;
      else if (path[i] == "..") {
        if (current_path.parent == null) {
          this.errorMessage = "Wrong path";
          this.getErrorMessage();
          return;
        } else {
          current_path = current_path.parent;
        }
      } else {
        let found = false;
        for (let j = 0; j < current_path.children.length; j++) {
          if (current_path.children[i]["name"] == path[i]) {
            found = true;
            current_path = current_path.children[i];
          }
        }
        if (found == false) {
          this.errorMessage = "Wrong path";
          this.getErrorMessage();
          return;
        }
      }
    }
    filesystem.pwd = current_path;
  }
}

class Pwd extends Command {
  constructor() {
    super("pwd", "pwd does not take any paramter.");
  }
  execute(filesystem, command) {
    if (command.length != 1) {
      this.getErrorMessage();
      return;
    }
    let path = [];
    let current_path = filesystem.pwd;
    while (current_path != null) {
      path.push(current_path["name"]);
      current_path = current_path.parent;
    }
    let path_string = "root";
    for (let i = path.length - 2; i >= 0; i--) {
      path_string += "/" + path[i];
    }
    let terminal = document.getElementById('web-terminal-window');
    let div = document.createElement('div');
    div.setAttribute('id', 'web-terminal-success-result');
    let p = document.createElement("p");
    p.innerHTML = path_string;
    div.appendChild(p);
    terminal.appendChild(div);
  }
}
class Help extends Command {
  constructor() {
    super("help", "help does not take any paramter.");
  }
  execute(filesystem, command) {
    if (command.length != 1) {
      this.getErrorMessage();
      return;
    }
    let terminal = document.getElementById('web-terminal-window');
    let div = document.createElement('div');
    div.setAttribute('id', 'web-terminal-success-result');
    let p = document.createElement("p");
    p.innerHTML = "cd &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; change directory<br>" +
      "help &nbsp;&nbsp;:&nbsp;&nbsp;  show this help window<br>" +
      "ls &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; list directory contents<br>" +
      "Open &nbsp;&nbsp;:&nbsp;&nbsp; open link in new tab<br>" +
      "pwd &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; present working directory";
    div.appendChild(p);
    terminal.appendChild(div);
  }
}

url = document.location + "asset/json/web-terminal.json";


let terminal = new WebTerminal();
fetch(url)
  .then(function (response) {
    return response.json();
  }).then((data) => {
    terminal.init(data);
    terminal.createCommandBox();
  })
  .catch(function (err) {
    let terminal = document.getElementById('web-terminal-window');
    let div = document.createElement('div');
    div.setAttribute('id', 'web-terminal-error-result');
    let p = document.createElement("p");
    p.innerHTML = "Unable to fetch data.";
    div.appendChild(p);
    terminal.appendChild(div);
  }); 
terminal.addCommand(new Ls());
terminal.addCommand(new Open());
terminal.addCommand(new Cd());
terminal.addCommand(new Pwd());
terminal.addCommand(new Help());
const msgsElement = document.querySelector('#msgs');
const usersElement = document.querySelector('#users');
const statusElement = document.querySelector('#status');

const params = new URLSearchParams(window.location.search);
const channel = params.get('channel') || 'projektiontv';
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channel],
});

client.connect().then(() => {
  statusElement.textContent = `Listening for messages in ${channel}...`;
});

let listeningForCount = false;
let users = {};

client.on('message', (wat, tags, message, self) => {
  if (self) return;
  const { username } = tags;

  let br = document.createElement("br");

  let containerUser = document.createElement("span");
  let nodeUser = document.createTextNode (username);
  containerUser.appendChild(nodeUser);
  containerUser.style.color = "red";

  let containerMsg = document.createElement("span");
  let nodeMsg = document.createTextNode (message);
  containerMsg.appendChild(nodeMsg);
  //containerMsg.style.color = "blue";

  var container = document.createElement("div");
  container.appendChild(containerUser);
  let seperator = document.createTextNode(": ");
  container.appendChild(seperator);
  container.appendChild(containerMsg);

  msgsElement.appendChild(container);
  //msgsElement.appendChild(br);
});

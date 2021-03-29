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
  let node = document.createTextNode (username + ': ' + message);
  msgsElement.appendChild(node);
  msgsElement.appendChild(br);

  /*if (username.toLowerCase() === channel.toLowerCase()) {
    if (message === '!start-count') {
      listeningForCount = true;
    } else if (message === '!end-count') {
      listeningForCount = false;
      // say count out loud.
      const sayCount = new SpeechSynthesisUtterance(Object.keys(users).length);
      window.speechSynthesis.speak(sayCount);
    } else if (message === '!clear-count') {
      countElement.textContent = 'Waiting for count...';
      usersElement.textContent = '';
      users = {};
    }
  } else if (listeningForCount && message === '1') {
    users[tags.username] = true;
    // display current count page.
    countElement.textContent = Object.keys(users).length;
    usersElement.textContent = Object.keys(users).join(', ');
  }*/
});

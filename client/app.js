// Configure Socket.IO

const socket = io();

// Socket listeners

socket.on("message", (event) => addMessage(event.author, event.content));

// References to HTML elements

const loginForm = document.querySelector("#welcome-form");
const messagesSection = document.querySelector("#messages-section");
const messagesList = document.querySelector("#messages-list");
const addMessageForm = document.querySelector("#add-messages-form");
const userNameInput = document.querySelector("#username");
const messageContentInput = document.querySelector("#message-content");

// Global variables

let userName = "";

// Functions

const login = (e) => {
  e.preventDefault();
  if (userNameInput.value.length > 0) {
    userName = userNameInput.value;
    loginForm.classList.remove("show");
    messagesSection.classList.add("show");
    addMessageForm.classList.add("show");
  } else {
    alert("Please enter a username");
  }
};

function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if (!messageContent.length) {
    alert("You have to type something!");
  } else {
    addMessage(userName, messageContent);
    socket.emit("message", { author: userName, content: messageContent });
    messageContentInput.value = "";
  }
}

const addMessage = (author, content) => {
  const message = document.createElement("li");
  message.classList.add("message");
  message.classList.add("message--received");
  if (author === userName) message.classList.add("message--self");
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? "You" : author}</h3>
    <div class="message__content">
        ${content}
    </div>
    `;
  messagesList.appendChild(message);
};

// Event listeners

loginForm.addEventListener("submit", (e) => login(e));
addMessageForm.addEventListener("submit", (e) => sendMessage(e));

let chats = JSON.parse(localStorage.getItem("chats")) || [[]];
let currentChat = Number(localStorage.getItem("currentChat")) || 0;

const chatDiv = document.getElementById("chatTab");
const input = document.getElementById("input");
const inputBox = document.getElementById("inputBox");

function save() {
  localStorage.setItem("chats", JSON.stringify(chats));
  localStorage.setItem("currentChat", currentChat);
}

function renderChat() {
  chatDiv.innerHTML = "";
  chats[currentChat].forEach(m => {
    const div = document.createElement("div");
    div.className = `msg ${m.role}`;
    div.textContent = m.text;
    chatDiv.appendChild(div);
  });
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

function send() {
  if (!input.value.trim()) return;

  chats[currentChat].push({ role: "user", text: input.value });
  const userText = input.value;
  input.value = "";
  renderChat();
  save();

  const typing = document.createElement("div");
  typing.className = "msg bot";
  typing.textContent = "AI друкує...";
  chatDiv.appendChild(typing);
  chatDiv.scrollTop = chatDiv.scrollHeight;

  setTimeout(() => {
    typing.remove();
    chats[currentChat].push({
      role: "bot",
      text: "Я твій AI 🤖 (demo)"
    });
    renderChat();
    save();
  }, 800);
}

function newChat() {
  chats.push([]);
  currentChat = chats.length - 1;
  save();
  renderChat();
}

function openTab(tab, btn) {
  document.querySelectorAll(".tabs button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  document.getElementById("chatTab").classList.add("hidden");
  document.getElementById("imageTab").classList.add("hidden");
  document.getElementById("videoTab").classList.add("hidden");
  inputBox.style.display = "none";

  if (tab === "chat") {
    document.getElementById("chatTab").classList.remove("hidden");
    inputBox.style.display = "flex";
  }
  if (tab === "image") document.getElementById("imageTab").classList.remove("hidden");
  if (tab === "video") document.getElementById("videoTab").classList.remove("hidden");
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") send();
});

renderChat();

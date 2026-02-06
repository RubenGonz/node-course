const lblPending = document.querySelector("#lbl-pending")
const deskHeader = document.querySelector("h1")
const noMoreAlert = document.querySelector(".alert")
const lblCurrentTicket = document.querySelector("small")

const btnAssign = document.querySelector("#btn-assign")
const btnDone = document.querySelector("#btn-done")

const params = new URLSearchParams(window.location.search);
if (!params.has("escritorio")) {
  window.location = "index.html"
  throw new Error("Escritorio es requerido")
}
const deskNumber = params.get('escritorio');
deskHeader.innerHTML = deskNumber

let workingTicket = null

function checkTicketCount(currentCount = 0) {
  currentCount === 0
    ? noMoreAlert.classList.remove("d-none")
    : noMoreAlert.classList.add("d-none")
  lblPending.innerHTML = currentCount
}

async function loadInitialCount() {
  const pendingTickets = await fetch("/api/tickets/pending").then(res => res.json())
  checkTicketCount(pendingTickets.length)
}

async function getTicket() {
  await finishTicket()

  const { status, message, ticket } = await fetch(`/api/tickets/assign/${deskNumber}`).then(res => res.json())
  if (status !== "ok") {
    lblCurrentTicket.innerHTML = message
  }
  workingTicket = ticket
  lblCurrentTicket.innerHTML = ticket.number
}

async function finishTicket() {
  if (!workingTicket) return;

  const { status, message, ticket } = await fetch(`/api/tickets/done/${workingTicket.id}`, {
    method: "PUT"
  }).then(res => res.json())

  if (status === "ok") {
    workingTicket = null
    lblCurrentTicket.innerHTML = "Nadie"
  }
}

function connectToWebSockets() {
  const socket = new WebSocket('ws://localhost:3000/ws');

  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data)
    if (type === "on-ticket-count-changed") checkTicketCount(payload)
  };

  socket.onclose = (event) => {
    console.log('Connection closed');
    setTimeout(() => {
      console.log('retrying to connect');
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (event) => {
    console.log('Connected');
  };
}

btnAssign.addEventListener("click", getTicket)
btnDone.addEventListener("click", finishTicket)

loadInitialCount()
connectToWebSockets();

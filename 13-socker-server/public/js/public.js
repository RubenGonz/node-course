async function renderTickets(tickets = []) {
  for (let i = 0; i < tickets.length; i++) {
    if (i >= 4) break

    const ticket = tickets[i]
    if (!ticket) continue

    const lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`)
    const lblDesk = document.querySelector(`#lbl-desk-0${i + 1}`)

    console.log(ticket);

    lblTicket.innerText = `Ticket ${ticket.number}${ticket.done ? ' (Finalizado)' : ''}`;
    lblDesk.innerHTML = ticket.assignedDesk
  }
}

async function loadCurrentTickets() {
  const tickets = await fetch("/api/tickets/working-on").then(res => res.json())
  renderTickets(tickets)
}

function connectToWebSockets() {
  const socket = new WebSocket('ws://localhost:3000/ws');

  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data)
    if (type === "on-working-changed") renderTickets(payload)
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

loadCurrentTickets()
connectToWebSockets()

const currentTickLbl = document.querySelector("span")
const createTicketBtn = document.querySelector("button")

async function getlastTicket() {
  const lastTicket = await fetch("/api/tickets/last")
    .then(res => res.json())
  currentTickLbl.innerHTML = lastTicket
}

async function createTicket() {
  const newTicket = await fetch("/api/tickets", {
    method: "POST"
  }).then(res => res.json())

  currentTickLbl.innerText = newTicket.number
}

createTicketBtn.addEventListener("click", createTicket)

getlastTicket()
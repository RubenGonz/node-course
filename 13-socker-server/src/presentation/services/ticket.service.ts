import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket.interface";
import { WssService } from "./wss.service";

export class TicketService {

  constructor(
    private readonly wssService = WssService.instance
  ) { }

  public tickets: Ticket[] = [
    { id: UuidAdapter.get(), number: 1, createdAt: new Date(), done: false },
    { id: UuidAdapter.get(), number: 2, createdAt: new Date(), done: false },
    { id: UuidAdapter.get(), number: 3, createdAt: new Date(), done: false },
    { id: UuidAdapter.get(), number: 4, createdAt: new Date(), done: false },
    { id: UuidAdapter.get(), number: 5, createdAt: new Date(), done: false },
    { id: UuidAdapter.get(), number: 6, createdAt: new Date(), done: false },
  ];

  private readonly assignedTickets: Ticket[] = [];

  // Tickets pendientes (no asignados y no finalizados)
  public get pendingTickets(): Ticket[] {
    return this.tickets.filter(ticket => !ticket.assignedDesk && !ticket.done);
  }

  // Últimos 4 tickets en atención
  public get recentTickets(): Ticket[] {
    return this.assignedTickets.slice(0, 4);
  }

  // Último número de ticket
  public get lastTicketNumber(): number {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
  }

  // Crear ticket nuevo
  public createTicket(): Ticket {
    const newTicket: Ticket = {
      id: UuidAdapter.get(),
      number: this.lastTicketNumber + 1,
      createdAt: new Date(),
      done: false,
    };

    this.tickets.push(newTicket);
    this.onTicketNumberChanged()
    return newTicket;
  }

  // Asignar ticket a un puesto
  public assignTicketToDesk(desk: string) {
    const ticket = this.tickets.find(t => !t.assignedDesk && !t.done);
    if (!ticket) return { status: "error", message: "No hay tickets pendientes" };

    ticket.assignedDesk = desk;
    ticket.assignedAt = new Date();

    this.assignedTickets.unshift(ticket);
    this.onTicketNumberChanged()
    this.onAssignedTicketsChanged()

    return { status: "ok", ticket };
  }

  // Finalizar ticket
  public finishTicket(id: string) {
    const ticket = this.tickets.find(t => t.id === id);
    if (!ticket) return { status: "error", message: "Ticket no encontrado" };

    ticket.done = true;

    this.onAssignedTicketsChanged();
    return { status: "ok" };
  }

  private onTicketNumberChanged() {
    this.wssService.sendMessage("on-ticket-count-changed", this.pendingTickets.length)
  }

  private onAssignedTicketsChanged() {
    this.wssService.sendMessage("on-working-changed", this.recentTickets)
  }
}

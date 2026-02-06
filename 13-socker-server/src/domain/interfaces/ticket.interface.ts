export interface Ticket {
  id: string,
  number: number,
  createdAt: Date,
  assignedDesk?: string,
  assignedAt?: Date
  done: boolean
}
import { Router } from "express";
import { TicketController } from "./controller";

export class TicketRoutes {

  static get routes() {
    const router = Router();
    const ticketController = new TicketController();

    router.get("/", ticketController.getTickets);
    router.get("/last", ticketController.getLastTicketNumber);
    router.get("/pending", ticketController.pendingTickets);
    router.get("/assign/:desk", ticketController.assignTicketToDesk);
    router.get("/working-on", ticketController.recentTickets);

    router.post("/", ticketController.createTicket);
    
    router.put("/done/:ticketId", ticketController.finishTicket);

    return router;
  }

}
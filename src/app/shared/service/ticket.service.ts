import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Ticket} from "../Model/Ticket";
import { TicketStatus } from "../Model/TicketStatus";
import { TicketPriority } from "../Model/TicketPriority";

@Injectable({
    providedIn: 'root'
  })

export class TicketService{
 
    private API_URL = 'http://localhost:8089/tickets/ListTickets' ;

    private API_URL1 = 'http://localhost:8089/tickets' ;

    constructor(private http: HttpClient) { }

    getAllTicket(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(this.API_URL);
      }
    
      addTicket(ticket : Ticket) {
        ticket.status = TicketStatus.PENDING;
        return this.http.post(`${this.API_URL1}/addTicket`, ticket)
      }
    
      editTicket(ticketId : number ,ticket : Ticket){
        return this.http.put(`${this.API_URL1}/${ticketId}/updateTicket`, ticket)
      }
      deleteTicket(ticketId : number){
        return  this.http.delete(`${this.API_URL1}/${ticketId}/deleteTicket`)
      }

      countTicketsByStatus(status: TicketStatus): Observable<number> {
        const url = `${this.API_URL}/tickets/count?status=${status}`;
        return this.http.get<number>(url);
      }

      getPriorityByStatus(status: TicketStatus): TicketPriority {
        switch (status) {
          case 'OPEN':
            return TicketPriority.HIGH;
          case 'PENDING':
            return TicketPriority.MEDIUM;
          case 'RESOLVED':
            return TicketPriority.LOW;
          case 'CLOSED':
            return TicketPriority.LOW;
          case 'ESCALATED':
            return TicketPriority.HIGH;
          case 'REOPENED':
            return TicketPriority.HIGH;
          default:
            return TicketPriority.LOW;
        }
      }

}
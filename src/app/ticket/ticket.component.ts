import { Component, OnInit } from '@angular/core';
import {TicketService} from "../shared/service/ticket.service";
import {Ticket} from "../shared/Model/Ticket";
import { TicketStatus } from "../shared/Model/TicketStatus";
import { TicketPriority } from "../shared/Model/TicketPriority";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  public tableData1: TableData;
  public tableData2: TableData;
  isUpdate:boolean=false;
  ticketList : any;
  selectedTicketStatus: String[] = [
      "OPEN",
      "PENDING",
      "RESOLVED",
      "CLOSED",
      "ESCALATED",
      "REOPENED"
  ];
  ticketStatusOptions: String[] = [
    "OPEN",
    "PENDING",
    "RESOLVED",
    "CLOSED",
    "ESCALATED",
    "REOPENED"
  ];

  ticket:Ticket = new Ticket();

  constructor(private ticketService:TicketService) { }

  showModal=false;

  ngOnInit(): void {
    this.getAllTicket();
    this.closePopupForUpdate();
    this.closePopupForCreate();
  }

  getAllTicket(){
    return this.ticketService.getAllTicket().subscribe(res => this.ticketList = res);
    }

    public deleteTicket(id:number) {
      this.ticketService.deleteTicket(id).subscribe(() => {
          console.log("Ticket deleted");
          this.getAllTicket();

      });
  }

  openPopupForUpdate(tickettoupdate:any){
    this.isUpdate=true;
    this.ticket=tickettoupdate;
    this.showModal = true;
}
closePopupForUpdate(){
    this.showModal = false;
}
openPopupForCreate(){
    this.isUpdate=false;
    this.showModal = true;
}
closePopupForCreate(){
    this.showModal = false;
}

onSubmit() {
  this.ticketService.addTicket(this.ticket).subscribe((data) =>{

      console.log(data);

  } );
}

getPriorityByStatus(status: TicketStatus): TicketPriority {
  return this.ticketService.getPriorityByStatus(status);
}



}

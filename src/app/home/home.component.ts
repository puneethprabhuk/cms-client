import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'typeOfAssignment', 'fees', 'updatedDate', 'status',];
  clientDetails: any;
  transactionDetails: any;
  totalTransaction: number = 0;
  totalClients: number = 0;
  totalRemuneration: number = 0;
  todaysRemuneration: number = 0;
  todaysTransaction: number = 0;
  todaysClients: number = 0;
  todaysDate = new Date();

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.homeService.getClients().subscribe(clients => {
      this.clientDetails = clients.body;
      this.totalClients = clients.body.length;
      let date = moment(this.todaysDate).format('DD-MM-YYYY');
      const todaysClients = this.clientDetails.filter((client) => moment(client.createdAt).format('DD-MM-YYYY') === date);
      this.todaysClients = todaysClients.length;
      this.clientDetails = this.clientDetails.slice(0, 6);
      this.homeService.getTransactions().subscribe(transactions => {
        this.transactionDetails = transactions.body;
        const todaysTransaction = this.transactionDetails.filter((transaction) => moment(transaction.createdAt).format('DD-MM-YYYY') === date);
        this.todaysTransaction = todaysTransaction.length;
        this.totalTransaction = transactions.body.length;
        for(let transaction of todaysTransaction) {
          this.todaysRemuneration = this.todaysRemuneration + transaction.fees;
        }
        for(let transaction of transactions.body) { 
          this.totalRemuneration = this.totalRemuneration + transaction.fees;
        }
        this.transactionDetails = this.transactionDetails.slice(0, 5);
      });
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CLOSE_TEXT, DELETE_CLIENT_CONF_MESSAGE, DELETE_CLIENT_MESSAGE, DELETE_CLIENT_TITLE, DELETE_TEXT, DELETE_TRANSACTION_MESSAGE, DELETE_TRANSACTION_TITLE, SOMETHING_WENT_WRONG, TRANSACTION_TABLE_ACTION, TRANSACTION_TABLE_ASM_YEAR, TRANSACTION_TABLE_CREATED_DATE, TRANSACTION_TABLE_FEES, TRANSACTION_TABLE_FIN_YEAR, TRANSACTION_TABLE_STATUS, TRANSACTION_TABLE_TYPE, TRANSACTION_TABLE_UPDATED_DATE } from 'src/app/core/constants/constant';
import { ClientViewService } from './client-view.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource;
  clientId: any;
  clientDetails: any;
  openTransactionAdd = false;
  openClientUpdate = false;
  selectedTransaction: any;
  confirmText = "";
  cancelText = "";
  titleText = "";
  deleteAction = "";
  messageText = "";
  openDeleteConf = false;
  count: number = 0;
  displayedColumns: string[] = [TRANSACTION_TABLE_TYPE, TRANSACTION_TABLE_FEES, TRANSACTION_TABLE_FIN_YEAR, TRANSACTION_TABLE_ASM_YEAR, TRANSACTION_TABLE_CREATED_DATE, TRANSACTION_TABLE_UPDATED_DATE, TRANSACTION_TABLE_STATUS, TRANSACTION_TABLE_ACTION];

  constructor(private route: ActivatedRoute,
    private clientViewService: ClientViewService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if(params && params.id) {
        this.clientId = params.id;
        this.getClient();
      } else {
      }
    })
  }

  getClient() {
    this.clientViewService.getClient(this.clientId).subscribe(client => {
      this.clientDetails = client?.body; 
      this.count = this.clientDetails?.transactionDetails?.length;
      this.dataSource = new MatTableDataSource<any>(this.clientDetails?.transactionDetails);
      this.dataSource.paginator = this.paginator;
    }, (error) => {

    });
  }


  openAddTransactionPopup(transaction?) {
    this.openTransactionAdd = true;
    this.selectedTransaction = transaction;  
  }

  closeAddTransactionPopup(status) {
    if(status === 'transaction_updated') {
      this.getClient();
    }
    this.openTransactionAdd = false;
  }

  openEditClientPopup() {
    this.openClientUpdate = true;
  }

  closeEditClientPopup(status) {
    if(status === 'client_updated') {
      this.getClient();
    }
    this.openClientUpdate = false;
  }

  closeDeleteClient(event) {
    if(event === DELETE_TRANSACTION_TITLE) {
      this.deleteTransaction();
    }
    if(event === DELETE_CLIENT_TITLE) {
      this.deleteClient()
    }
    this.openDeleteConf = false;
  }

  openDeleteTransaction(transactionDetails?) {
    this.confirmText = DELETE_TEXT;
    this.cancelText = CLOSE_TEXT;
    this.titleText = DELETE_TRANSACTION_TITLE;
    this.deleteAction = DELETE_TEXT;
    this.messageText = DELETE_TRANSACTION_MESSAGE;
    this.selectedTransaction = transactionDetails;
    this.openDeleteConf = true;
  }

  openDeleteClient() {
    this.confirmText = DELETE_TEXT;
    this.cancelText = CLOSE_TEXT;
    this.titleText = DELETE_CLIENT_TITLE;
    this.deleteAction = DELETE_TEXT;
    this.messageText = DELETE_CLIENT_CONF_MESSAGE;
    this.openDeleteConf = true;
  }

  deleteTransaction() {
    this.clientViewService.deleteTransaction(this.clientId, this.selectedTransaction).subscribe(res => {
      this.selectedTransaction = "";
      this.toastr.success(DELETE_TRANSACTION_MESSAGE, DELETE_TRANSACTION_TITLE);
      this.getClient();
    }, (error) => {
      this.toastr.error(SOMETHING_WENT_WRONG, DELETE_TRANSACTION_TITLE);
    });
  }


  deleteClient() {
    this.clientViewService.deleteClient(this.clientId).subscribe(res => {
      this.selectedTransaction = "";
      this.toastr.success(DELETE_CLIENT_MESSAGE, DELETE_CLIENT_TITLE);
      this.router.navigate(['/client/client-list']);
    }, (error) => {
      this.toastr.error(SOMETHING_WENT_WRONG, DELETE_CLIENT_TITLE);
    });
  }
}

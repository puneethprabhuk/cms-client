import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TransactionListService } from './transaction-list.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CLOSE_TEXT, DELETE_TEXT, DELETE_TRANSACTION_MESSAGE, DELETE_TRANSACTION_TITLE, SOMETHING_WENT_WRONG, TRANSACTION_TABLE_ACTION, TRANSACTION_TABLE_ASM_YEAR, TRANSACTION_TABLE_CREATED_DATE, TRANSACTION_TABLE_FEES, TRANSACTION_TABLE_FIN_YEAR, TRANSACTION_TABLE_NAME, TRANSACTION_TABLE_STATUS, TRANSACTION_TABLE_TYPE, TRANSACTION_TABLE_UPDATED_DATE } from 'src/app/core/constants/constant';


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  dataSource;
  transactionList: any;
  displayedColumns: string[] = [TRANSACTION_TABLE_NAME, TRANSACTION_TABLE_TYPE, TRANSACTION_TABLE_FEES, TRANSACTION_TABLE_FIN_YEAR, TRANSACTION_TABLE_ASM_YEAR, TRANSACTION_TABLE_CREATED_DATE, TRANSACTION_TABLE_UPDATED_DATE, TRANSACTION_TABLE_STATUS];
  confirmText = DELETE_TEXT;
  cancelText = CLOSE_TEXT;
  titleText = DELETE_TRANSACTION_TITLE;
  deleteAction = DELETE_TEXT;
  messageText = DELETE_TRANSACTION_MESSAGE;
  openDeleteConf = false;
  transactionId: any;
  count: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private transactionListService: TransactionListService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTransactionList();
  }

  getTransactionList() {
    this.transactionListService.getTransaction().subscribe(transaction => {
      this.transactionList = transaction.body;
      this.count = this.transactionList?.length;
      this.dataSource = new MatTableDataSource<any>(this.transactionList);
      this.dataSource.paginator = this.paginator;
    })
  }

  selectedTransaction: any;
  openDeleteTransaction(transactionId, transactionDetails) {
    this.transactionId = transactionId;
    this.selectedTransaction = transactionDetails;
    this.openDeleteConf = true;
  }

  closeDeleteTransaction(event) {
    if(event === DELETE_TRANSACTION_TITLE) {
      this.deleteClient();
    }
    this.openDeleteConf = false;
  }

  deleteClient() {
    this.transactionListService.deleteTransaction(this.transactionId, this.selectedTransaction).subscribe(res => {
      this.selectedTransaction = "";
      this.toastr.success(DELETE_TRANSACTION_MESSAGE, DELETE_TRANSACTION_TITLE);
      this.transactionId = "";
      this.getTransactionList();
    }, (error) => {
      this.toastr.error(SOMETHING_WENT_WRONG, DELETE_TRANSACTION_TITLE);
      this.transactionId = "";
    })
  }

}

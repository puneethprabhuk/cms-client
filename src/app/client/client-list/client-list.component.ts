import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientListService } from './client-list.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CLIENT_TABLE_ACTION, CLIENT_TABLE_ADDRESS, CLIENT_TABLE_CREATED_DATE, CLIENT_TABLE_EMAIL, CLIENT_TABLE_NAME, CLIENT_TABLE_NUMBER, CLIENT_TABLE_UPDATED_DATE, CLOSE_TEXT, DELETE_CLIENT_CONF_MESSAGE, DELETE_CLIENT_MESSAGE, DELETE_CLIENT_TITLE, DELETE_TEXT, SOMETHING_WENT_WRONG } from 'src/app/core/constants/constant';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  dataSource;
  clientList: any;
  confirmText = DELETE_TEXT;
  cancelText = CLOSE_TEXT;
  titleText = DELETE_CLIENT_TITLE;
  deleteAction = DELETE_TEXT;
  messageText = DELETE_CLIENT_CONF_MESSAGE;
  openDeleteConf = false;
  clientId: string;
  clientsCount: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [ CLIENT_TABLE_NAME, CLIENT_TABLE_EMAIL, CLIENT_TABLE_NUMBER, CLIENT_TABLE_ADDRESS, CLIENT_TABLE_CREATED_DATE, CLIENT_TABLE_UPDATED_DATE, CLIENT_TABLE_ACTION];




  constructor(private clientListService: ClientListService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clientListService.getClients().subscribe(clients => {
      this.clientList = clients.body;
      this.clientsCount = this.clientList?.length;
      this.dataSource = new MatTableDataSource<any>(this.clientList);
      this.dataSource.paginator = this.paginator;
    })
  }

  openDeleteClient(clientId) {
    this.clientId = clientId;
    this.openDeleteConf = true;
  }

  closeDeleteClient(event) {
    if(event === this.titleText) {
      this.deleteClient();
    }
    this.openDeleteConf = false;
  }

  deleteClient() {
    this.clientListService.deleteClient(this.clientId).subscribe(res => {
      this.toastr.success(DELETE_CLIENT_MESSAGE, DELETE_CLIENT_TITLE);
      this.clientId = "";
      this.getClients();
    }, (error) => {
      this.toastr.error(SOMETHING_WENT_WRONG, DELETE_CLIENT_TITLE);
      this.clientId = "";
    })
  }

}

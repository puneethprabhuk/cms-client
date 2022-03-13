import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class TransactionListService {

  constructor(private apiService: ApiService) { }

  getTransaction() {
    const path = 'clients/transactions';
    return this.apiService.getApi(path);
  }

  deleteTransaction(clientId, transactionDetails) {
    const path = `clients/transactionDelete/${clientId}`;
    return this.apiService.patchApi(path, transactionDetails);
  }
}

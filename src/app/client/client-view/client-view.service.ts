import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class ClientViewService {

  constructor(private apiService: ApiService) { }

  getClient(clientId) {
    const path = `clients/${clientId}`;
    return this.apiService.getApi(path);
  }

  updateClient(clientId, clientData) {
    const path =  `clients/${clientId}`;
    return this.apiService.patchApi(path, clientData);
  }


  deleteClient(clientId) {
    const path =  `clients/${clientId}`;
    return this.apiService.deleteApi(path);
  }



  deleteTransaction(clientId, transactionData) {
    const path =  `clients/transactionDelete/${clientId}`;
    return this.apiService.patchApi(path, transactionData);
  }


  addTransaction(clientId, transactionData) {
    const path =  `clients/transaction/${clientId}`;
    return this.apiService.patchApi(path, transactionData);
  }

  updateTransaction(clientId, transactionData) {
    const path =  `clients/transactionUpdate/${clientId}`;
    return this.apiService.patchApi(path, transactionData);
  }
}

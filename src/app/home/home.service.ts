import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class HomeService {

  constructor(private apiService: ApiService) { }

  getClients() {
    const path = 'clients';
    return this.apiService.getApi(path);
  }

  getTransactions() {
    const path = 'clients/transactions';
    return this.apiService.getApi(path);
  }
}

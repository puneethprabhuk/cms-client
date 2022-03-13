import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class ClientListService {

  constructor(private apiService: ApiService) { }

  getClients() {
    const path = 'clients';
    return this.apiService.getApi(path);
  }

  deleteClient(clientId) {
    const path = `clients/${clientId}`;
    return this.apiService.deleteApi(path);
  }
}

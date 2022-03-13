import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class ClientAddService {

  constructor(private apiService: ApiService) { }

  saveClient(clientDetails) {
    const path = 'clients';
    return this.apiService.postApi(path, clientDetails);
  }
}

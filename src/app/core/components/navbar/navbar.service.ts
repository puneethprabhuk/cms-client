import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class NavbarService {

  constructor(private apiService: ApiService) { }

  getClients() {
    const path = 'clients';
    return this.apiService.getApi(path);
  }

  getProfile(userId: string) {
    const path = `users/${userId}`;
    return this.apiService.getApi(path);
  }

  
}

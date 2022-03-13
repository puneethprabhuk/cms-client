import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class ProfileService {

  constructor(private apiService: ApiService) { }

  // getProfile(userId: string) {
  //   const path = `users/${userId}`;
  //   return this.apiService.getApi(path);
  // }

  updateProfile(userId, profileData) {
    const path =  `users/${userId}`;
    return this.apiService.patchApi(path, profileData);
  }
}

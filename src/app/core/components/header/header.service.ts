import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class HeaderService {

  private profileDetails: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private apiService: ApiService) { }

  getProfile(userId: string) {
    const path = `users/${userId}`;
    return this.apiService.getApi(path);
  }

  getProfileDetailsData(userId: string) {
    return this.getProfile(userId).pipe(
      tap(
        data => {
          this.setProfileDetails(data);
        }
      )
      )
  }

  setProfileDetails(value) {
    this.profileDetails.next(value);
  }

  getProfileDetails(): Observable<any> {
    return this.profileDetails.asObservable();
  }
}

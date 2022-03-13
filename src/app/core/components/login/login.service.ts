import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private apiService: ApiService,
    private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
    this.currentUserSubject.asObservable();
  }

  public get currentUserValue():any {
    return this.currentUserSubject.value;
  }

  login(loginDetails) {
    let contentHeader = new HttpHeaders({ "Content-Type":"application/json" });
    const path = `users/signIn`;
    return this.apiService.postApi(path, loginDetails, { headers: contentHeader }).pipe(map(res => {
        const headers: HttpHeaders = res.headers;
        const token = res.body.token;        
        localStorage.setItem('authToken', JSON.stringify(token));
        this.currentUserSubject.next(res);
        return res;
    }));
  }

  logout() {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }
}

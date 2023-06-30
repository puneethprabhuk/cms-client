import { HttpHeaders, HttpParams, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { delay, retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.baseurl;
  constructor(private http: HttpClient) { }

  /** GET */
  public getApi(
    path: string,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
      responseType?: any;
      reportProgress?: boolean;
      withCredentials?: boolean;
    }): Observable<any> {


    const optionsData = this.updateOptions(options);
    let url = '';
    url = `${this.apiUrl}${path}`;
    return this.http
      .get<any>(url, optionsData)
      .pipe(catchError((error) => this.handleError(error)));
  }


  /** POST */
  public postApi(
    path: string,
    body: any,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
      responseType?: any;
      reportProgress?: boolean;
      withCredentials?: boolean;
    }
  ): Observable<any> {
    const optionsData: any = { observe: 'response' };

    if (options) {
      optionsData.headers = options.headers ? options.headers : null;
      optionsData.params = options.params ? options.params : null;
      optionsData.responseType = options.responseType
        ? options.responseType
        : null;
      optionsData.reportProgress = options.reportProgress;
      optionsData.withCredentials = options.withCredentials;
    }
    const url = `${this.apiUrl}${path}`;
    return this.http
      .post<any>(url, body, optionsData)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /** PUT */
  public putApi(
    path: string,
    body: any,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
      responseType?: any;
      reportProgress?: boolean;
      withCredentials?: boolean;
    }): Observable<any> {
    const optionsData: any = { observe: 'response' };
    let url = '';
    url = `${this.apiUrl}${path}`;
    return this.http
      .put<any>(url, body, optionsData)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /** PUT */
  public patchApi(
    path: string,
    body: any,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
      responseType?: any;
      reportProgress?: boolean;
      withCredentials?: boolean;
    }): Observable<any> {
    const optionsData: any = { observe: 'response' };
    let url = '';
    url = `${this.apiUrl}${path}`;
    return this.http
      .patch<any>(url, body, optionsData)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /** DELETE */
  public deleteApi(
    path: string,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
      responseType?: any;
      reportProgress?: boolean;
      withCredentials?: boolean;
      body?: any;
    }): Observable<any> {

    const optionsData = this.updateOptions(options);
    const url = `${this.apiUrl}${path}`;
    return this.http
      .delete<any>(url, optionsData)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return throwError(error);
  }



  private updateOptions(options: any) {
    const optionsData: any = { observe: 'response' };
    if (options) {
      optionsData.headers = options.headers ? options.headers : null;
      optionsData.params = options.params ? options.params : null;
      optionsData.responseType = options.responseType
        ? options.responseType
        : null;
      optionsData.reportProgress = options.reportProgress;
      optionsData.withCredentials = options.withCredentials;
      optionsData.body = options.body ? options.body : null;
    }

    return optionsData;
  }

}

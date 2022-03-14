import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  @Output() requestEvent = new EventEmitter<string>();
  private serverURL: string = environment.serverUrl;
  constructor(private http: HttpClient) { }

  // Solicitud GET
  getRequest(path:string): Observable<string> {
    return this.http.get<string>(this.serverURL + path);
  }

  // Solicitud POST
  postRequest(path:string, info:any): Observable<string> {
    return this.http.post<string>(this.serverURL + path, info);
  }

  // Solicitud DELETE
  deleteRequest(path:string): Observable<string> {
    return this.http.delete<string>(this.serverURL + path);
  }
}

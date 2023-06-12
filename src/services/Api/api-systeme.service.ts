import { EnvironnementService } from './../Env/environnement.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiSystemeService {

  constructor(private http: HttpClient, private env: EnvironnementService) { }

  public post(endpoint: string, body: any): Observable<any>{
      return this.http.post(this.env.hostName+endpoint+this.env.ext, JSON.stringify(body));
  }

  public put(endpoint: string, body?: any): Observable<any>{
      return this.http.put(this.env.hostName+endpoint+this.env.ext, body ); 
  }

  public get(endpoint: string, body?: any, paramName?: string): Observable<any>{
    //const param = new HttpParams().set(''+paramName, body);
      return this.http.get(this.env.hostName+endpoint+this.env.ext);
  }
}

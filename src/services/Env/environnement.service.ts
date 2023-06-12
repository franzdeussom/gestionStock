import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironnementService {
    hostName: string = 'http://localhost:6064/';
    wsHost: string = 'ws://localhost:6065?id=';
    ext: string = '.php';
  constructor() { }
}

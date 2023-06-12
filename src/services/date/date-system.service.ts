import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateSystemService {

  constructor() { }
  
  getFormatDatePremium(): string{
    const date = new Date();
    
    return ''+date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
  }

  getFullHours(){
    const date = new Date();

    return ''+date.getHours()+'h' + '' + date.getMinutes();
  }
}

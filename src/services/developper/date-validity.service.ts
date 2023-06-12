import { Validity } from './../../app/simpleUserPage/developper/validity.enum';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateValidityService {
  public guiDate: string = '';

  constructor() { }

  
  getDateValidity(validty: string): string{
    let date = '';
      switch (validty){
        case Validity.A:
            date = this.defineDateA();
        break;
        case Validity.B:
            date = this.defineDateB();
        break;
        case Validity.C:
            date = this.defineDateC();
        break;
        case Validity.D:
            date = this.defineDateD();
        break;
      }  

      return date;
  }

  private defineDateA(): string{
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth()+1;
      let year = date.getFullYear();
      if(month == 12 && day == 31){
        year++;
        month = 1;
        day = 31;
        if(month >= 9){
         this.guiDate = ''+year+'/'+'0'+month+'/'+day;
        }else{
         this.guiDate = ''+year+'/'+month+'/'+day;
        }


         return this.guiDate;
      };
      if(month >= 9){
        this.guiDate = ''+year+'/'+'0'+month+'/'+day;
       }else{
        this.guiDate = ''+year+'/'+month+'/'+day;
       }
      this.guiDate = ''+year+'/'+(month+1)+'/'+day;
      return this.guiDate;
  }

  private defineDateB(): string{
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    if(month >= 10){
      year++;
      month = (month + 3) - 12;
      if(month >= 9){
        this.guiDate = ''+year+'/'+'0'+month+'/'+day;
       }else{
        this.guiDate = ''+year+'/'+month+'/'+day;
       }

     return this.guiDate;
    };

    this.guiDate = ''+year+'/'+(month+3)+'/'+day;

    return this.guiDate;
  }

  private defineDateC(): string{
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    if(month >= 7){
        year++;
        month = (month + 6) - 12;
        if(month >= 9){
          this.guiDate = ''+year+'/'+'0'+month+'/'+day;
         }else{
          this.guiDate = ''+year+'/'+month+'/'+day;
         }
  
        return this.guiDate;
    }
    if(month >= 9){
      this.guiDate = ''+year+'/'+'0'+(month+6)+'/'+day;
     }else{
      this.guiDate = ''+year+'/'+(month+6)+'/'+day;
     }
      console.log('0'+month)
      return this.guiDate;
  }

  private defineDateD(): string{
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear()+1;
    if(month >= 9){
      this.guiDate = ''+year+'/'+'0'+(month)+'/'+day;
     }else{
      this.guiDate = ''+year+'/'+(month)+'/'+day;
     }

    return this.guiDate;
  }

  getCurrentDate(): string{
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    return ''+year+'/'+month+'/'+day;
  }
}

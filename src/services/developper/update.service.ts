import { Endpoint } from './../Api/endpoint.enum';
import { ApiSystemeService } from './../Api/api-systeme.service';
import { Injectable } from '@angular/core';
import { Alert } from '../AlertInterface/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  showAlertSucess: boolean = false;
  showAlertError: boolean = false;
 public alert : Alert = new Alert();

  constructor(private api: ApiSystemeService) { }
  
  doUpdate(date: string){
      const requestBody = { to: 'update', dateValue: date }
      this.api.post(Endpoint.DEV_UPDATE_VALIDITY, requestBody).subscribe((res)=>
      {
        if(Object.keys(res).length){
            this.alert.successMessage = 'Prolongation effectuer avec succes !';
            this.showAlertSucess = true;
        }else{
          this.alert.errorMessage = 'Un probleme est survenue lors de loperation !';
          this.showAlertError = true;
        }
        this.autoClose();
      });

  }

   autoClose(){
      setTimeout(() => {
       this.closeErrorAlert();
       this.closeSuccessAlert();
      }, 2500);
    }

  closeSuccessAlert(){
      this.showAlertSucess = false;
  }

  closeErrorAlert(){
      this.showAlertError = false;
  }
}

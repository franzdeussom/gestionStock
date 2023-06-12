import { Endpoint } from './../Api/endpoint.enum';
import { DemandeConge } from './conge.model';
import { ApiSystemeService } from './../Api/api-systeme.service';
import { Injectable } from '@angular/core';
import { AlertMessage } from 'src/app/simpleUserPage/employes/alertMessage.model';
import { Alert } from '../AlertInterface/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class GestionCongeService {
  listHolidayRequest: DemandeConge[] = [];
  showAlertSucess: boolean = false;
  showAlertError: boolean = false;
  alert: Alert = new Alert();

  constructor(private api: ApiSystemeService) {

   }

   createHolidayRequest(request: DemandeConge){
      this.api.post(Endpoint.CREATE_HOLIDAY, request).subscribe((resp)=>{
            if(Object.keys(resp).length > 0){
              this.activeAlertSucess(AlertMessage.CREATE_HOLIDAY_REQUEST_SUCCESS);
            }
      }, (err)=>{
        this.activeAlertError(AlertMessage.ERROR);
      });

   }

   confirmHolidayRequest(id: number): boolean{
      const requestBody = {id: id , decision: 'CONFIRM' };
      let isDone = false;

      this.api.post(Endpoint.CONFIRM_HOLIDAY_REQUEST, requestBody).subscribe((resp)=>{
          if(Object.keys(resp).length > 0){
              isDone = true;
          }
      });
      
      return isDone;
   }

   deleteRequest(id: number, index: number, isFromSeachList: boolean){
      const requestBody = { id: id, to:'DELETE'};

      this.api.post(Endpoint.DELETE_HOLIDAY_REQUEST, requestBody).subscribe((resp)=>{
          if(Object.keys(resp).length > 0){
              this.activeAlertSucess(AlertMessage.DELETE_SUCCESS);
              this.deleteInMainList(index, id, isFromSeachList);
          }
      });

   }

   deleteInMainList(index: number, id:number, isFromSeachList?: boolean){    
      if(isFromSeachList){
          const indexInList = this.listHolidayRequest.findIndex((conge)=> conge.idConge == id);
          this.listHolidayRequest.splice(0, indexInList);
      }else{
        this.listHolidayRequest.splice(0, index);
      }

   }

   getAllRequest(){
      this.api.get(Endpoint.GET_HOLIDAY_REQUEST)
      .subscribe((resp)=>{
          if(Object.keys(resp).length > 0){
            this.listHolidayRequest = Array.from(resp[0]);
            this.listHolidayRequest = this.listHolidayRequest.concat(Array.from(resp[1]))
          }
      });
      
    }

    doSearch(username: string): DemandeConge[]{
        const exec = (conge: DemandeConge)=>{
            return conge.nom?.toLowerCase().substring(0, username.length) === username.toLowerCase() || conge.prenom?.toLowerCase().substring(0, username.length) === username.toLowerCase();
        }

      return this.listHolidayRequest.filter(exec);
    }

      activeAlertSucess(message: string){
        this.alert.successMessage = message;
        this.showAlertSucess = true;
    }

    activeAlertError(message: string){
        this.alert.errorMessage = message;
        this.showAlertError = true;
    }

    closeSuccessAlert(){
      this.showAlertSucess = false;
    }

    closeErrorAlert(){
      this.showAlertError = false;
    }

    close(){

      setTimeout(() => {
          this.closeSuccessAlert();
          this.closeErrorAlert()
      }, 2500);
  }

}

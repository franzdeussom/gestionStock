import { AlertMessage } from './../../app/simpleUserPage/employes/alertMessage.model';
import { Endpoint } from './../Api/endpoint.enum';
import { ApiSystemeService } from './../Api/api-systeme.service';
import { Injectable } from '@angular/core';
import { Sanction } from './sanction.model';
import { Alert } from '../AlertInterface/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class GestionSanctionService {
  public listSanction : Sanction[] = [];
  
  public alert: Alert = new Alert();
  public showAlertSucess: boolean = false;
  public showAlertError: boolean = false;

  constructor(
              private api: ApiSystemeService 
  ) { }

  creeSanction(sanction:  Sanction){
    this.api.post(Endpoint.CREATE_SANCTION, sanction).subscribe((response)=>{
        if(Object.keys(response).length > 0){
            this.activeAlertSucess(AlertMessage.SANCTION_CREATED);
            this.listSanction.push(sanction);
        }
    }, (err)=>{
        console.log(err);
        this.activeAlertError(AlertMessage.ERROR);
    });
  }

  delete(id: number, index: number){
    console.log('vor list',this.listSanction);

    const requestBody = { id : id };
    this.api.post(Endpoint.DELETE_SANCTION, requestBody).subscribe((resp)=>{
          if(Object.keys(resp).length > 0){
              this.activeAlertSucess(AlertMessage.DELETE_SUCCESS);
              this.deleteOnMainList(index);
          }
    }, (err)=>{
      console.log(err);
      this.activeAlertError(AlertMessage.ERROR);
    })
  }

  deleteOnMainList(id: number){
      const index = this.listSanction.findIndex((sanction)=> sanction.id == id);

      this.listSanction.splice(index, 1);
  }

  getAllSanction(){
    this.api.get(Endpoint.LOAD_ALL_SANCTION).subscribe((resp)=>{
        if(Object.keys(resp).length > 0){
            this.listSanction = Array.from(resp[0]);
            this.listSanction = this.listSanction.concat(resp[1]);
        }
    }, (err)=>{
      this.activeAlertError(AlertMessage.ERROR);
      console.log(err.message);
    });
  }


  close(){  
      setTimeout(() => {
          this.closeSuccessAlert();
          this.closeErrorAlert()
      }, 3800);
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

}

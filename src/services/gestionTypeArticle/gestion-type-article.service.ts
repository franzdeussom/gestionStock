import { AlertMessage } from 'src/app/simpleUserPage/employes/alertMessage.model';
import { Endpoint } from './../Api/endpoint.enum';
import { ApiSystemeService } from './../Api/api-systeme.service';
import { TypeArticle } from './typeArticle.model';
import { Injectable } from '@angular/core';
import { Alert } from '../AlertInterface/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class GestionTypeArticleService {
  public alert: Alert = new Alert();
  public showAlertSucess: boolean = false;
  public showAlertError: boolean = false;

  public listTypeOfArticle: TypeArticle[] = [];

  constructor(private api: ApiSystemeService) { }

  createNewType(type: TypeArticle){
    const addOnMainList = (newType: TypeArticle)=>{
              this.listTypeOfArticle.push(newType);
    }
      this.api.post(Endpoint.CREATE_TYPE_ARTICLE, type).subscribe((resp)=>{
          if(Object.keys(resp).length > 0){
            this.activeAlertSucess(AlertMessage.CREATION_TYPE_SUCCESS);
            addOnMainList(type);
          }
      }, ()=> {
          this.activeAlertError(AlertMessage.ERROR);
      });
  }

  updateType(type: TypeArticle){
      this.api.post(Endpoint.UPDATE_TYPE_ARTICLE, type).subscribe((resp)=>{
          if(Object.keys(resp).length > 0){
              this.updateOnList(type);
              this.activeAlertSucess(AlertMessage.MODIFY_EMPLOYE_SUCCESS)
          }
      }, (err)=>{
          this.activeAlertError(AlertMessage.ERROR + ': log :' + err.message)
      });

  }

  updateOnList(type: TypeArticle){
      const index = this.listTypeOfArticle.findIndex((tyArtcl)=> tyArtcl.id == type.id);
      if(index != -1){
        Object.assign(this.listTypeOfArticle[index], type);
      }
  }

  //access: cashier, director, stockeeper
  getAllType(): TypeArticle[]{
    let listToReturn : TypeArticle[] = [];
      this.api.get(Endpoint.LOAD_ALL_TYPE).subscribe((resp)=>{
            if(Object.keys(resp).length > 0){
                this.listTypeOfArticle = Array.from(resp);
                listToReturn = Array.from(resp);
            }
      }, (err)=>{
          console.log('Error on loading', err);
      });

      return listToReturn;
  }

  close(){  
      setTimeout(() => {
          this.closeSuccessAlert();
          this.closeErrorAlert()
      }, 2500);
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

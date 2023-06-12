import { GestionArticleService } from 'src/services/gestionArticle/gestion-article.service';
import { AlertMessage } from 'src/app/simpleUserPage/employes/alertMessage.model';
import { Endpoint } from './../Api/endpoint.enum';
import { ApiSystemeService } from './../Api/api-systeme.service';
import { Injectable } from '@angular/core';
import { Alert } from '../AlertInterface/alert.interface';
import { Charge } from './charge.model';

@Injectable({
  providedIn: 'root'
})
export class GestionChargeService {
  public alert: Alert = new Alert();
  public showAlertSucess: boolean = false;
  public showAlertError: boolean = false;
  public SommeTotal: number = 0;
  public listCharge: Charge[] = [];

  constructor( private api: ApiSystemeService, private articleSrv: GestionArticleService) { }

  createCharge(charge: Charge){
      this.api.post(Endpoint.CREATE_CHARGE, charge).subscribe((resp)=>{
          
          if(Object.keys(resp).length > 0){
              this.activeAlertSucess(AlertMessage.CHARGE_CREATED);
          }
      }, (err)=>{
          console.log(err);
          this.activeAlertError(AlertMessage.ERROR);
      });
  }

  isQtyAvailable(charge : Charge): boolean{
      let resp: boolean = false;
      const index = this.articleSrv.listArticle.findIndex((value)=> value.idArticle == charge.idArticle && value.idRefType == charge.idRefArticle);
      if(index != -1){
          if(this.articleSrv.listArticle[index].qteCourrante < charge.qte){
              this.activeAlertError('il se pourrait que la quantite presente dans votre stock soit inférieur que votre demande !');

          }else{
              resp = true;
          }
      }
      return resp;
  }

  getListCharge(){
      this.api.get(Endpoint.LOAD_CHARGE).subscribe((resp)=>{
            if(Object.keys(resp).length > 0){
              this.listCharge = Array.from(resp[0]);
              this.listCharge = this.listCharge.concat(resp[1]);
              this.defineSommtotalPerte()
            }
      }, (err)=>{
        console.log(err);
        this.activeAlertError(AlertMessage.ERROR);
      });
  }

  async defineSommtotalPerte(){
      this.listCharge.forEach((perte)=>{
            this.SommeTotal = this.SommeTotal + perte.prix;
      });

      console.log('somme total perte', this.SommeTotal);
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

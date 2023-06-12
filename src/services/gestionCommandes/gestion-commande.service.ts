import { AlertMessage } from 'src/app/simpleUserPage/employes/alertMessage.model';
import { GestionArticleService } from './../gestionArticle/gestion-article.service';
import { Endpoint } from './../Api/endpoint.enum';
import { ApiSystemeService } from './../Api/api-systeme.service';
import { EnvironnementService } from './../Env/environnement.service';
import { Employe } from './../gestionEmployes/employe.model';
import { Injectable } from '@angular/core';
import { Message } from './Message.model';
import { Ventes } from './Vente.model';
import { Alert } from '../AlertInterface/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class GestionCommandeService {
  public alert : Alert = new Alert();
  
  public showAlertSucess: boolean = false;
  public showAlertError: boolean = false;
  
  globalListVente: Ventes[]= [];
  prixGlobalVenteGain: number = 0;
  prixGlobalVentes: number = 0;


  listVenteJour: Ventes[] = [];
  prixGlobalVenteJourGain : number = 0;
  prixTotalVentes_Jour: number = 0;

  constructor(private api: ApiSystemeService,
              ) {   }

    getGlobalListVente(){
          this.api.get(Endpoint.RAPPORT_VENTE).subscribe((resp)=>{
              if(Object.keys(resp).length > 0){
                  this.globalListVente =  Array.from(resp);
                  this.genereGainAllVente();
                  this.generePrixTotal();
              }
          }, (err)=>{
                  console.log(err);
                  this.activeAlertError(AlertMessage.ERROR);
          });
    }

    getListVenteJour(){
        this.api.get(Endpoint.RAPPORT_VENTE_JOUR).subscribe((resp)=>{
              if(Object.keys(resp).length > 0){
                  this.listVenteJour = Array.from(resp);
                  this.genereGainJour();
                  this.genereTotalPrixVenteJour();
              }
          }, (err)=>{
                  console.log(err);
                  this.activeAlertError(AlertMessage.ERROR);
          });
    }

    async generePrixTotal(){
        // prix de vente total sans gain (statistique)
        this.prixGlobalVentes = 0;
        this.globalListVente.forEach((vente)=>{
            this.prixGlobalVentes = this.prixGlobalVentes + vente.montantVente;  
        });

    }

    async genereGainAllVente(){
      //gain de toutes les ventes (statistique)
      this.prixGlobalVenteGain = 0;
         this.globalListVente.forEach((vente)=>{
            this.prixGlobalVenteGain = this.prixGlobalVenteGain + vente.marge;  
        });
    }

    async genereGainJour(){
      this.prixGlobalVenteJourGain = 0;
        this.listVenteJour .forEach((vente)=>{
            this.prixGlobalVenteJourGain = this.prixGlobalVenteJourGain + vente.marge;
        });
    }

    async genereTotalPrixVenteJour(){
        this.prixTotalVentes_Jour = 0;
        this.listVenteJour .forEach((vente)=>{
          this.prixTotalVentes_Jour = this.prixTotalVentes_Jour + vente.montantVente;
        });
    }

    doSearch(searchValue: string): Ventes[]{
        const exe = (vente: Ventes)=>{
            return vente.dates.toString().substring(0, searchValue.length) === searchValue;
        }

        return this.globalListVente.filter(exe);
    }

    activeAlertError(message: string){
      this.alert.errorMessage = message;
      this.showAlertError = true;
    }
  
    closeErrorAlert(){
      this.showAlertError = false;
    }
  
    activeAlertSucess(message: string){
      this.alert.successMessage = message;
      this.showAlertSucess = true;
    }
  
    closeSuccessAlert(){
      this.showAlertSucess = false;
    }
  
    close(){
      setTimeout(() => {
          this.closeErrorAlert();
          this.closeSuccessAlert();
      }, 3500);   
    }
}

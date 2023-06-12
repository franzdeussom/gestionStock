import { CREDENTIAL } from './../../../services/user/user.enum';
import { CheckUserService } from 'src/services/user/check-user.service';
import { Ventes } from './../../../services/gestionCommandes/Vente.model';
import { GestionCommandeService } from './../../../services/gestionCommandes/gestion-commande.service';
import { Component } from '@angular/core';
import { Alert } from 'src/services/AlertInterface/alert.interface';

@Component({
  selector: 'app-admin-rapport-vente',
  templateUrl: './admin-rapport-vente.component.html',
  styleUrls: ['./admin-rapport-vente.component.scss']
})
export class AdminRapportVenteComponent {
  filterValue: string = '';
  alert: Alert = new Alert();
  showAlertSucess: boolean = false;
  showAlertError: boolean = false;
  ListRapportVente: any[] = new Array();
  ListRsltSearchRapportVente: Ventes[] = [];

  gainJourFiltrer: number = 0;
  prixVenteJourFiltrer: number = 0;

    constructor(public gestionVenteSrv: GestionCommandeService, 
                private checkUser: CheckUserService){
              this.hasAuthority();
              this.loadVente();  
    }

  hasAuthority(){
      if(this.checkUser.currentUserData.role !== CREDENTIAL.ADMIN_ROLE){
          throw new Error();
      }
  }
  doFilter(){
   this.ListRsltSearchRapportVente = this.gestionVenteSrv.doSearch(this.filterValue);
    this.generatePriceFilter();
    /*if(this.isFilterValueValid()){
        //this.gestionVenteSrv.doSearch(this.filterValue);
    }else{
      this.activeAlertError('Format de date incorect ! Format valid : ');
      this.autoClose();
    }*/
  }
  async generatePriceFilter(){
      this.gainJourFiltrer = 0;
      this.prixVenteJourFiltrer = 0;

      this.ListRsltSearchRapportVente.forEach((vente)=>{
          this.gainJourFiltrer = this.gainJourFiltrer + vente.marge;
          this.prixVenteJourFiltrer = this.prixVenteJourFiltrer + vente.montantVente;
      });

  }


  async loadVente(){
    if(this.gestionVenteSrv.globalListVente.length == 0){
        this.gestionVenteSrv.getGlobalListVente(); 
    }
  }

  refresh(){
    this.gestionVenteSrv.getGlobalListVente(); 
  }

  isFilterValueValid(){
    const values = this.filterValue.split('/');
    return values.length == 3;
  }

  closeSuccessAlert(){
    this.showAlertSucess = false;
  }

  activeAlertSucess(message: string){
    this.alert.successMessage = message;
    this.showAlertSucess = true;
  }

  activeAlertError(message: string){
    this.alert.errorMessage = message;
    this.showAlertError = true;
  }
  closeErrorAlert(){
    this.showAlertError = false;
  }

  autoClose(){
    setTimeout(() => {
        this.closeSuccessAlert();
        this.closeErrorAlert();
    }, 2500);
  }
}

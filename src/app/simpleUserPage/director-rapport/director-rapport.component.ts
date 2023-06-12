import { CREDENTIAL } from './../../../services/user/user.enum';
import { CheckUserService } from 'src/services/user/check-user.service';
import { GestionCommandeService } from './../../../services/gestionCommandes/gestion-commande.service';
import { GestionVenteService } from './../../../services/rapportvente/gestion-vente.service';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-director-rapport',
  templateUrl: './director-rapport.component.html',
  styleUrls: ['./director-rapport.component.scss']
})
export class DirectorRapportComponent {
  @ViewChild('tabApprovisionement') tabApproV!: ElementRef;
  @ViewChild('tabRapportVente') tabRapportVente!: ElementRef;

  constructor(public gestionVenteSrv: GestionCommandeService,
              private checkUser: CheckUserService  
            ){
            this.hasAuthority();
            this.loadAllVente();
  }

  hasAuthority(){
    if(this.checkUser.currentUserData.role !== CREDENTIAL.DIRECTOR_ROLE){
        throw new Error();
    }
  }
  async loadAllVente(){
    if(this.gestionVenteSrv.listVenteJour.length === 0){
      this.gestionVenteSrv.getListVenteJour();
    }
  }

  changeToTabRapportApprov(){
      this.tabRapportVente.nativeElement.classList.remove('active');
      this.tabApproV.nativeElement.classList.add('active');
  }
  changeToTabRapportVente(){
    this.tabApproV.nativeElement.classList.remove('active');
    this.tabRapportVente.nativeElement.classList.add('active');
  }

  refresh(){
    this.gestionVenteSrv.getListVenteJour();
  }

}

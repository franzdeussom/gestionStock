import { CREDENTIAL } from 'src/services/user/user.enum';
import { CheckUserService } from 'src/services/user/check-user.service';
import { GestionChargeService } from 'src/services/gestionCharge/gestion-charge.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-perte',
  templateUrl: './admin-perte.component.html',
  styleUrls: ['./admin-perte.component.scss']
})
export class AdminPerteComponent {

  constructor(public gestionChargeSrv: GestionChargeService,
              private checkUserSrv: CheckUserService
              ){
                this.hasAuthority();
                this.loadPerte();
              }

  hasAuthority(){
      if(this.checkUserSrv.currentUserData.role !== CREDENTIAL.ADMIN_ROLE){
          throw new Error();
      }
  }
  async loadPerte(){
    if(this.gestionChargeSrv.listCharge.length == 0){
       this.gestionChargeSrv.getListCharge();
    }
  }

  refresh(){
      this.gestionChargeSrv.listCharge.length = 0;
      this.gestionChargeSrv.getListCharge();
  }
}

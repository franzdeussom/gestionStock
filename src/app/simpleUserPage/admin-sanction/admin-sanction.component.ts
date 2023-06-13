import { CREDENTIAL } from 'src/services/user/user.enum';
import { CheckUserService } from 'src/services/user/check-user.service';
import { GestionSanctionService } from './../../../services/gestionSanction/gestion-sanction.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sanction',
  templateUrl: './admin-sanction.component.html',
  styleUrls: ['./admin-sanction.component.scss']
})
export class AdminSanctionComponent {

  constructor(public sanctionSrv: GestionSanctionService, 
              private checkUserSrv: CheckUserService
              ){
                this.hasAuthority();
                this.loadListSanction();
              }

  hasAuthority(){
      if(this.checkUserSrv.currentUserData.role !== CREDENTIAL.ADMIN_ROLE){
          throw new Error();
      }
  }

  async loadListSanction(){
    if(this.sanctionSrv.listSanction.length == 0){
        this.sanctionSrv.getAllSanction();
    }

    this.sanctionSrv.close();
  }

  refrech(){
    this.sanctionSrv.listSanction = [];
    this.sanctionSrv.getAllSanction();
    this.sanctionSrv.close();
  }

  delSanction(id: number, index: number){
    this.sanctionSrv.delete(id, index);
    this.sanctionSrv.close();
  }
}

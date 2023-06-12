import { Statut } from './../../../services/gestionEmployes/typePresence.enum';
import { CheckUserService } from 'src/services/user/check-user.service';
import { Presence } from './../../../services/gestionEmployes/presence.model';
import { GestionEmployesService } from './../../../services/gestionEmployes/gestion-employes.service';
import { Component } from '@angular/core';
import { CREDENTIAL } from 'src/services/user/user.enum';

@Component({
  selector: 'app-admin-rapport-presence',
  templateUrl: './admin-rapport-presence.component.html',
  styleUrls: ['./admin-rapport-presence.component.scss']
})
export class AdminRapportPresenceComponent {
  filterValue:  string = '';
  listRsltSearch: Presence[] = [];
  statut = Statut;
  constructor( public employeSrv: GestionEmployesService, 
               private checkUser: CheckUserService
      ){    this.hasAuthority();
            this.loadPresence();
  }

  hasAuthority(){
    if(this.checkUser.currentUserData.role !== CREDENTIAL.ADMIN_ROLE){
        throw new Error();
    }
}
  async loadPresence(){
    if(this.employeSrv.globalListPresent.length == 0){
        this.employeSrv.getRapportPresence();
    }
  }

  doFilter(){
      this.listRsltSearch = this.employeSrv.searchInPresenceList(this.filterValue);
  }
}

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GestionStatsService } from './../../../services/gestionStat/gestion-stats.service';
import { CheckUserService } from 'src/services/user/check-user.service';
import { Component } from '@angular/core';
import { CREDENTIAL } from 'src/services/user/user.enum';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent {
    showDetails: boolean = false;

    constructor(private checkUser: CheckUserService, public gestionStat: GestionStatsService, private ngBmodal: NgbModal){
      this.hasAuthority();
      this.loadStat();
    }


  hasAuthority(){
      if(this.checkUser.currentUserData.role !== CREDENTIAL.ADMIN_ROLE){
          throw new Error();
      }
  }

  async loadStat(){
    if(!this.gestionStat.isStatsLoad){
         this.gestionStat.loadStats();
    }
  }

  refresh(){
      this.gestionStat.isStatsLoad = false;
      this.showDetails = false;
      this.gestionStat.loadStats();
  }

  click(){
      if(!this.showDetails){
          this.showDetails = true;
      }else{
          this.showDetails = false;
      }
  }

  close(){
      this.ngBmodal.dismissAll();
  }
}

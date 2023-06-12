import { CheckUserService } from 'src/services/user/check-user.service';
import { Statut } from './../../../services/gestionEmployes/typePresence.enum';
import { Presence } from './../../../services/gestionEmployes/presence.model';
import { GestionEmployesService } from './../../../services/gestionEmployes/gestion-employes.service';
import { Component, OnInit } from '@angular/core';
import { CREDENTIAL } from 'src/services/user/user.enum';

@Component({
  selector: 'app-fiche-presence',
  templateUrl: './fiche-presence.component.html',
  styleUrls: ['./fiche-presence.component.scss']
})
export class FichePresenceComponent implements OnInit {
    listUserPresence: Presence[];
    listParticularEmploye: Presence[] = [];
    defaultDate: string = '';
    typeList: string = '';
    isListParticular: boolean = false;
    saveDone: boolean = false;
    showSpinner: boolean = false;
    statut = Statut;
    
    constructor(public employeSrv: GestionEmployesService, 
                private checkUserSvr: CheckUserService
                )
    {
      this.isDataUserSet(); 
      this.listUserPresence = new Array<Presence>();
    }
    
    ngOnInit(): void {

      this.defaultDate = this.employeSrv.defaultDateDay;
      this.initList();

    }

    isDataUserSet(){
      if(this.checkUserSvr.currentUserData.role !== CREDENTIAL.DIRECTOR_ROLE){
          throw new Error("Can't access this page, authentification required !");
      }
    }

    initList(){
      this.listUserPresence = Array.from(this.employeSrv.listUserPresent);
      this.listParticularEmploye = Array.from(this.employeSrv.listParticularPresent);
    }

  changeStatutToPresent(index: number){
      this.employeSrv.changeStatutUserToPresent(index);
  } 

  changeStatutToAbsent(index: number){
      this.employeSrv.changeStatutUserToAbsent(index);
  }

  checkList(){
    console.log(this.typeList);
      if(this.typeList === 'EMPLOYE PARTICULIERS'){
          this.isListParticular = true;
      }else{
          this.isListParticular = false;
      }
  }

  refreshList(){
      this.employeSrv.buildListPresence();
      this.listUserPresence = this.employeSrv.listUserPresent;
      
  }

  refreshListParticular(){
    this.employeSrv.buildListPresencOfParticular();
    this.listParticularEmploye = this.employeSrv.listParticularPresent;
  }
  
  doSave(isParticulart: boolean){
    this.showSpinner = true;
    this.employeSrv.savePresenceList(this.defaultDate, isParticulart);
    this.employeSrv.close();
  }



}

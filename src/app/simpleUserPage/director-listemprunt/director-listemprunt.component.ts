import { CREDENTIAL } from './../../../services/user/user.enum';
import { CheckUserService } from 'src/services/user/check-user.service';
import { Statut } from './../../../services/gestionEmployes/typePresence.enum';
import { Component } from '@angular/core';
import { GestionArticleService } from 'src/services/gestionArticle/gestion-article.service';
import { Emprunt } from '../cashier-create-command/emprunt.model';

@Component({
  selector: 'app-director-listemprunt',
  templateUrl: './director-listemprunt.component.html',
  styleUrls: ['./director-listemprunt.component.scss']
})
export class DirectorListempruntComponent {
  statut = Statut;
  listSearchRslt: Emprunt[] = [];
  searchValue: string = '';

  constructor(private checkUser: CheckUserService, 
              public gestionArticleSrv: GestionArticleService  
            ){
              this.hasAuthority();
              this.loadEmprunt();
            }

  hasAuthority(){
    if(this.checkUser.currentUserData.role !== CREDENTIAL.DIRECTOR_ROLE){
      throw new Error();
    }
  }

  async loadEmprunt(){
    if(this.gestionArticleSrv.listEmprunt.length == 0){
      this.gestionArticleSrv.getAllEmprunt();
    }

  }

  doSearch(){
      this.listSearchRslt = Array.from(this.gestionArticleSrv.doSearchInEmpruntList(this.searchValue));
  }

  updateStatutEmprunt(emprunt: Emprunt){
    const index = this.gestionArticleSrv.listEmprunt.findIndex((emprt)=> emprt.id == emprunt.id);
    this.gestionArticleSrv.updateEmpruntSatut(index);
    this.gestionArticleSrv.close();
  }

  refresh(){
    this.gestionArticleSrv.getAllEmprunt();
  }

  doDelete(id: number){
      const index = this.gestionArticleSrv.listEmprunt.findIndex((emprunt)=> emprunt.id == id);
      if(index != -1){
          this.gestionArticleSrv.deleteEmprunt(index, id);
      }
      this.gestionArticleSrv.close();
  }
}

import { CREDENTIAL } from './../../../services/user/user.enum';
import { GestionTypeArticleService } from './../../../services/gestionTypeArticle/gestion-type-article.service';
import { Router } from '@angular/router';
import { CheckUserService } from './../../../services/user/check-user.service';
import { GestionArticleService } from './../../../services/gestionArticle/gestion-article.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-magazinier-dasboard',
  templateUrl: './magazinier-dasboard.component.html',
  styleUrls: ['./magazinier-dasboard.component.scss']
})
export class MagazinierDasboardComponent {

  constructor(public gestionArticleSrv: GestionArticleService,
              private checkUser: CheckUserService,
              public typeArticleSrv: GestionTypeArticleService,
              private router: Router
              ){
                this.isAuthentificated();
                this.loadArticle();
              }

  isAuthentificated(){
    if(this.checkUser.currentUserData.role !== CREDENTIAL.STOCKEEPER_ROLE){
        throw new Error('access dont allowed !');
    }
  }

  loadArticle(){
      this.gestionArticleSrv.loadArticle();
      this.loadType();
  }
  
  loadType(){
    this.typeArticleSrv.getAllType();
  }

  navigateToListArticle(){
      this.router.navigateByUrl('gestion/stock');
  }
  goToAnalysePage(){
      this.router.navigateByUrl('stock/analyse');
  }

}

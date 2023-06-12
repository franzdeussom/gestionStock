import { Article } from './../../../services/gestionArticle/article.model';
import { GestionArticleService } from 'src/services/gestionArticle/gestion-article.service';
import { CheckUserService } from 'src/services/user/check-user.service';
import { Component } from '@angular/core';
import { CREDENTIAL } from 'src/services/user/user.enum';

@Component({
  selector: 'app-admin-rapport-stock',
  templateUrl: './admin-rapport-stock.component.html',
  styleUrls: ['./admin-rapport-stock.component.scss']
})
export class AdminRapportStockComponent {
  listSearch : Article[] = [];
  searchValue: string = '';
  constructor(private checkUser: CheckUserService , 
              public gestionArticleSrv: GestionArticleService
              ){
          this.hasAuthority()
  }
  
  hasAuthority(){
    if(this.checkUser.currentUserData.role !== CREDENTIAL.ADMIN_ROLE){
        throw new Error();
    }
    this.loadArticle()
 }
 
 loadArticle(){
    if(this.gestionArticleSrv.listArticle.length == 0){
      this.gestionArticleSrv.loadArticle();
    }
  }
  refresh(){
    this.gestionArticleSrv.loadArticle();
  }
  doSearchArticle(){
    this.listSearch = Array.from(this.gestionArticleSrv.doSearch(this.searchValue));
  }

}

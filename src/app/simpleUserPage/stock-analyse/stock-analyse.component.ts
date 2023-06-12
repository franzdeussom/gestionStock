import { CREDENTIAL } from './../../../services/user/user.enum';
import { CheckUserService } from 'src/services/user/check-user.service';
import { GestionArticleService } from 'src/services/gestionArticle/gestion-article.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stock-analyse',
  templateUrl: './stock-analyse.component.html',
  styleUrls: ['./stock-analyse.component.scss']
})
export class StockAnalyseComponent {
  analysLaunch: boolean = false;

  constructor(public gestionArticleSrv: GestionArticleService, 
              public checkUser: CheckUserService
              ){this.hasAuthority()}

  hasAuthority(){
    if(this.checkUser.currentUserData.role !== CREDENTIAL.STOCKEEPER_ROLE){
        throw new Error();
    }
  }

  refresh(){
    this.analysLaunch = true;
    this.gestionArticleSrv.listArticleToSupply = [];
    setTimeout(() => {
        this.gestionArticleSrv.analyseStock();
        this.analysLaunch = false;
    }, 5000);
  }
}

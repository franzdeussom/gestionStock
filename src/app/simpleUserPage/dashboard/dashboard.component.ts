import { CREDENTIAL } from './../../../services/user/user.enum';
import { GestionArticleService } from 'src/services/gestionArticle/gestion-article.service';
import { Employe } from './../../../services/gestionEmployes/employe.model';
import { GestionEmployesService } from './../../../services/gestionEmployes/gestion-employes.service';
import { DateSystemService } from './../../../services/date/date-system.service';
import { Router } from '@angular/router';
import { CheckUserService } from './../../../services/user/check-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    date: string = '';
    listEmploye!: Employe[];

    constructor(private checkUsrSrv: CheckUserService, private route: Router, 
                private dateSystem: DateSystemService, public employeSrv: GestionEmployesService,
                public gestionArticleSrv: GestionArticleService
                ){
       
       if(this.isDataUserPresent()){
            throw new Error();
        }else{
          this.loadEmployee();
          this.loadArticle();
        }

    }

  ngOnInit(): void {
      this.buildDate();
  }

  loadEmployee(){
    if(this.employeSrv.listEmploye.length == 0){
       this.employeSrv.loadAllEmploye();
    }
  }

  async loadArticle(){
        if(this.gestionArticleSrv.listArticle.length == 0){
            this.gestionArticleSrv.loadArticle();
        }
  }

  buildDate(){
    this.date = this.dateSystem.getFormatDatePremium();
  }

  buildListPresence(){
    if(this.employeSrv.listUserPresent.length == 0){
      this.employeSrv.buildListPresence();
    }
  }

  isDataUserPresent(): boolean{
      return this.checkUsrSrv.currentUserData.role !== CREDENTIAL.DIRECTOR_ROLE;
  }

  
  navigateToPresentList(){
    this.route.navigateByUrl('director/present-list')
  }

  navigateToListEmploye(){
    this.route.navigateByUrl('director/employee-list')
  }
  
  navigateToListStock(){
    this.route.navigateByUrl('director/stock');
  }
}

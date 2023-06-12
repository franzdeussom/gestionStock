import { GestionCommandeService } from './../../../services/gestionCommandes/gestion-commande.service';
import { CREDENTIAL } from './../../../services/user/user.enum';
import { CheckUserService } from 'src/services/user/check-user.service';
import { StatusEmprunt } from './../cashier-create-command/statusEmprunt.enum';
import { Emprunt } from './../cashier-create-command/emprunt.model';
import { Ventes } from './../../../services/gestionCommandes/Vente.model';
import { GestionArticleService } from 'src/services/gestionArticle/gestion-article.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-cashier-resume',
  templateUrl: './cashier-resume.component.html',
  styleUrls: ['./cashier-resume.component.scss']
})
export class CashierResumeComponent implements OnInit{
  @ViewChild('allVenteDay') allVenteDay!: ElementRef;
  @ViewChild('allEmprunt') allEmprunt!: ElementRef;
  listVenteDay : Ventes[] = [];
  isAllVenteTabActive: boolean = true;
  searchValue: string = '';
  listSearchRslt : Emprunt[]=[];
  statut = StatusEmprunt;

    constructor(public gestionArticleSrv: GestionArticleService,
                private checkUser: CheckUserService
                ){ this.hasAuthority()}


  ngOnInit(): void {
  }

    hasAuthority(){
      if(this.checkUser.currentUserData.role !== CREDENTIAL.CASHIER_ROLE){
          throw new Error();

      }
      this.loadVenteDay();
    }

  switchTab(){
    if(this.isAllVenteTabActive){
      this.allVenteDay.nativeElement.classList.remove('active');
      this.allEmprunt.nativeElement.classList.add('active');
      this.isAllVenteTabActive = false;
      this.loadEmprunt();
    }else{
      this.allEmprunt.nativeElement.classList.remove('active');
      this.allVenteDay.nativeElement.classList.add('active');
      this.isAllVenteTabActive = true;
    }
  }

  async loadEmprunt(){
    if(this.gestionArticleSrv.listEmprunt.length == 0){
      this.gestionArticleSrv.getAllEmprunt();
    }

  }

  loadVenteDay(){
    this.listVenteDay = Array.from(this.gestionArticleSrv.listVenteDay);
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
}

import { Emprunt } from './emprunt.model';
import { Employe } from './../../../services/gestionEmployes/employe.model';
import { GestionEmployesService } from './../../../services/gestionEmployes/gestion-employes.service';
import { AlertMessage } from 'src/app/simpleUserPage/employes/alertMessage.model';
import { Ventes } from './../../../services/gestionCommandes/Vente.model';
import { GestionTypeArticleService } from './../../../services/gestionTypeArticle/gestion-type-article.service';
import { CheckUserService } from './../../../services/user/check-user.service';
import { Article } from './../../../services/gestionArticle/article.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionArticleService } from './../../../services/gestionArticle/gestion-article.service';
import { GestionCommandeService } from './../../../services/gestionCommandes/gestion-commande.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DateSystemService } from 'src/services/date/date-system.service';
import { StatusEmprunt } from './statusEmprunt.enum';
import { CREDENTIAL } from 'src/services/user/user.enum';

@Component({
  selector: 'app-cashier-create-command',
  templateUrl: './cashier-create-command.component.html',
  styleUrls: ['./cashier-create-command.component.scss']
})
export class CashierCreateCommandComponent implements OnInit{
  @ViewChild('tabEmprunt') tabEmprunt!: ElementRef;
  @ViewChild('tabNewCommand') tabNewVente!: ElementRef;

      listFilterByType: Article[] = [];
      indexArticle: number = 0;
      newVente: Ventes =new Ventes();
      newEmprunt: Emprunt = new Emprunt();
      listEmploye: Employe[] = [];
      article: Article = new Article();
      formCommandControl!: FormGroup;
      formEmpruntControl!: FormGroup;
      isTabEmpruntOpen: boolean = false;
      indexArticleEmprunt: number = 0;
      constructor(
                  private checkUserSrv: CheckUserService,
                  public articleSrv: GestionArticleService,
                  public employeSrv: GestionEmployesService,
                  public typeArticleSrv: GestionTypeArticleService,
                  private fb: FormBuilder,
                  private date: DateSystemService
                  ){
                    this.hasAutority();
                    this.articleSrv.loadArticle();
                   // this.commandSrv.loadArticle();
                    this.typeArticleSrv.getAllType();
                    this.createControlCommadForm();
                    this.createControlEmpruntForm();                  
                  }

  ngOnInit(): void {
    this.loadEmploye(); 
    this.init(); 
  }

  createControlCommadForm(){
    this.formCommandControl = this.fb.group({
            type: ['', Validators.required],
            name: ['', Validators.required],//id nomArticle
            quantite: ['', Validators.required],
            prixVente: ['', Validators.required],
            date: ['', Validators.required]  
    });
    this.formCommandControl.controls['date'].setValue(this.date.getFormatDatePremium());
    this.formCommandControl.valueChanges.subscribe((data)=>{
        this.initCommand();
    });
  }

  createControlEmpruntForm(){
    this.formEmpruntControl = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],//id nomArticle
      quantite: ['', Validators.required],
      nameUser: ['', Validators.required],
      prixVente: ['', Validators.required],
      date: ['', Validators.required]  
    });
    this.formEmpruntControl.controls['date'].setValue(this.date.getFormatDatePremium());
    this.formEmpruntControl.valueChanges.subscribe((data)=>{
          this.initEmprunt();
    })
  }

  switchTab(){
    if(this.isTabEmpruntOpen){
        this.tabEmprunt.nativeElement.classList.remove('active');
        this.tabNewVente.nativeElement.classList.add('active');
        this.isTabEmpruntOpen = false;
    }else{
        this.tabNewVente.nativeElement.classList.remove('active');
        this.tabEmprunt.nativeElement.classList.add('active');
        this.isTabEmpruntOpen = true;
    }
  }

  loadEmploye(){
    this.employeSrv.loadAllEmploye();
  }

  init(){
    setTimeout(() => {
      this.listEmploye = Array.from(this.employeSrv.listEmploye);
      this.listEmploye = this.listEmploye.concat(this.employeSrv.listParticularEmploye);      
    }, 1500);
  }

  hasAutority(){
    if(this.checkUserSrv.currentUserData.role !== CREDENTIAL.CASHIER_ROLE){
      throw new Error('cant autorization to access here');
      }
  }

  checkQuantity(){
      
  }

  getListFilterByType(){
    const type = this.formCommandControl.get('type')?.value;
    if(typeof type !== 'undefined'){
      this.listFilterByType = Array.from(this.articleSrv.getListArticleNameByType(type));
    }
  }

  async isQtyAvailable(){
    const idArticle = Number.parseInt(this.formCommandControl.get('name')?.value);
    const qtyRequested = this.formCommandControl.get('quantite')?.value
    const index = this.listFilterByType.findIndex((article=> article.idArticle == idArticle));
    if(index != -1){
      this.indexArticle = index;
      if(qtyRequested > this.listFilterByType[index].qteCourrante){
        this.articleSrv.activeAlertError('La quantite demande nest pas encore disponible pour ce produit');
        this.articleSrv.close();
        this.formCommandControl.controls['quantite'].setValue(undefined);

      }else if(this.listFilterByType[index].qteCourrante == 0){
        this.articleSrv.activeAlertError('Cette article est epuise dans le stock');
        this.articleSrv.close();
        this.formCommandControl.controls['quantite'].setValue(undefined);
      }else{
        if(qtyRequested >=0){
          this.newVente.nomArticle = this.listFilterByType[index].nomArticle;
          this.newVente.qteVendue = qtyRequested;
          this.getTotalPrice();
        }
          
      }
    }
  }

 async getTotalPrice(){
      const qty = this.formCommandControl.get('quantite')?.value;
      const prixVente = this.formCommandControl.get('prixVente')?.value;

      if(typeof qty === 'undefined' || typeof qty == null){
        this.articleSrv.activeAlertError('Veuillez entrer la quantite !');
      }else{
        if(typeof prixVente !== 'undefined' || typeof prixVente != null){
          if(qty >= 0){
            this.newVente.totalAPayer = qty * prixVente; 
            this.newVente.prixVente = prixVente;
          }else{
              this.articleSrv.activeAlertError('Veuillez une quantite supperieur à 0 !');
          }
          
        }   
      }

      this.articleSrv.close();
}

  initCommand(){      
      this.newVente.nomType = this.formCommandControl.get('type')?.value;
      this.newVente.prixVente = this.formCommandControl.get('prixVente')?.value;
      this.newVente.qteVendue = this.formCommandControl.get('quantite')?.value;
      this.newVente.dates = this.formCommandControl.get('date')?.value;
      this.newVente.idArticle = Number.parseInt(this.formCommandControl.get('name')?.value);
      this.newVente.idUser = this.checkUserSrv.currentUserData.idUser;
    }

  initEmprunt(){
    this.newEmprunt.nomType = this.formEmpruntControl.get('type')?.value;
    this.newEmprunt.prixVente = this.formEmpruntControl.get('prixVente')?.value;
    this.newEmprunt.qte =  this.formEmpruntControl.get('quantite')?.value;
    this.newEmprunt.date = this.formEmpruntControl.get('date')?.value;
    this.newEmprunt.idArticle = Number.parseInt(this.formEmpruntControl.get('name')?.value);
    
  }

  save(){
    const setMarge= ()=>{
      this.newVente.marge = this.newVente.totalAPayer - (this.newVente.qteVendue * this.listFilterByType[this.indexArticle].prixUnitaire); 
    }
    const isPriceVenteCorrect = ()=>{
      return this.newVente.prixVente >= this.listFilterByType[this.indexArticle].prixUnitaire;
    }
      if(this.isEntryValid()){
          if(isPriceVenteCorrect()){
            setMarge();
            this.newVente.heure = this.date.getFullHours();
             this.articleSrv.doVente(this.newVente);
            this.getListFilterByType();
            this.formCommandControl.reset();
            this.createControlCommadForm();
          }else{
            this.formCommandControl.controls['prixVente'].setValue(undefined);

            this.articleSrv.activeAlertError('Vous ne pouvez pas vendre ce produits moins que son prix unitaire.');
          } 
        
      }else{
        this.articleSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
      }
      this.articleSrv.close();
  }

// ****emprunt function*****

checkUser(){
  const nom = this.formEmpruntControl.get('nameUser')?.value;

  const index = this.listEmploye.findIndex((empl => empl.nom + ' ' + empl.prenom === nom));

    if(typeof this.listEmploye[index].idUser === 'undefined'){
        this.newEmprunt.idUser = null;
        this.newEmprunt.id_employe = this.listEmploye[index].id_employe;
    }else{
        this.newEmprunt.id_employe = null;
        this.newEmprunt.idUser = this.listEmploye[index].idUser;
    }
}
  getListFilterByTypeEmprunt(){
    const type = this.formEmpruntControl.get('type')?.value;
    if(typeof type !== 'undefined'){
      this.listFilterByType = Array.from(this.articleSrv.getListArticleNameByType(type));
    }
  }


  async isQtyAvailableEmprunt(){
    const idArticle = Number.parseInt(this.formEmpruntControl.get('name')?.value);
    const qtyRequested = this.formEmpruntControl.get('quantite')?.value
    const index = this.listFilterByType.findIndex((article=> article.idArticle == idArticle));
    
    if(index != -1){
      this.indexArticleEmprunt = index;
      if(qtyRequested > this.listFilterByType[index].qteCourrante){
        this.articleSrv.activeAlertError('La quantite demande nest pas encore disponible pour ce produit');
        this.formEmpruntControl.controls['quantite'].setValue(undefined);

      }else if(this.listFilterByType[index].qteCourrante == 0){
        this.articleSrv.activeAlertError('Cette article est epuise en stock');
        this.formEmpruntControl.controls['quantite'].setValue(undefined);
      
      }else{
        if(qtyRequested >= 0){
          this.newEmprunt.nomArticle = this.listFilterByType[index].nomArticle;
          this.newEmprunt.idRefArticle = this.listFilterByType[index].idRefType;
          this.newEmprunt.qte = qtyRequested;
          this.getTotalPriceEmprunt();
        }else{
              this.articleSrv.activeAlertError('Veuillez entrer une quantite supperieur à 0!');
              this.formEmpruntControl.controls['quantite'].setValue(undefined);
          }
         
      }
      this.articleSrv.close();
    }    
  }

 async getTotalPriceEmprunt(){
      const qty = this.formEmpruntControl.get('quantite')?.value;
      const prixVente = this.formEmpruntControl.get('prixVente')?.value;

      if(typeof qty === 'undefined' || typeof qty == null){
        this.articleSrv.activeAlertError('Veuillez entrer la quantite !');
      }else{
        if(typeof prixVente !== 'undefined' || typeof prixVente != null){
          if(qty >= 0 ){
            this.newEmprunt.netAPayer = qty * prixVente; 
            this.newEmprunt.prixVente = prixVente;
          }else{
              this.articleSrv.activeAlertError('Veuillez entrer une quantite supperieur à 0!');
              this.formEmpruntControl.controls['quantite'].setValue(undefined);

            }
          
        }   
      }
      this.articleSrv.close();

}

  saveEmprunt(){
    const isPriceVenteCorrect = ()=>{
      return this.newEmprunt.prixVente >= this.listFilterByType[this.indexArticleEmprunt].prixUnitaire;
    }
      if(this.isEntryEmpruntValid()){
        if(isPriceVenteCorrect()){
          this.newEmprunt.statut = StatusEmprunt.NON_REGLE;
          console.log(this.newEmprunt);
          this.articleSrv.doEmprunt(this.newEmprunt);
          this.getListFilterByTypeEmprunt();
          this.formEmpruntControl.reset();
          this.createControlEmpruntForm();
        }else{
          this.formEmpruntControl.controls['prixVente'].setValue(undefined);
          this.articleSrv.activeAlertError('Vous ne pouvez pas vendre ce produits moins que son prix unitaire.');
        }   
      }else{
        this.articleSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
      }
      this.articleSrv.close();
  }

  isEntryEmpruntValid(): boolean{
      return this.formEmpruntControl.valid;
  }

  isEntryValid(): boolean{
    return this.formCommandControl.valid;
  }
}

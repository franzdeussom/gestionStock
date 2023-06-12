import { CREDENTIAL } from './../../../services/user/user.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertMessage } from 'src/app/simpleUserPage/employes/alertMessage.model';
import { DateSystemService } from 'src/services/date/date-system.service';
import { Charge } from './../../../services/gestionCharge/charge.model';
import { CheckUserService } from 'src/services/user/check-user.service';
import { GestionArticleService } from './../../../services/gestionArticle/gestion-article.service';
import { GestionTypeArticleService } from './../../../services/gestionTypeArticle/gestion-type-article.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { GestionChargeService } from 'src/services/gestionCharge/gestion-charge.service';

@Component({
  selector: 'app-director-perte',
  templateUrl: './director-perte.component.html',
  styleUrls: ['./director-perte.component.scss']
})
export class DirectorPerteComponent {
  @ViewChild('newPerte') tabPerte!: ElementRef;
  @ViewChild('allList') tabList!: ElementRef;
  isTabListOpen: boolean = false;
  perte: Charge = new Charge();
  formControlOnIdSet!: FormGroup;
  mainFormControl!: FormGroup;

  isArticle: boolean = false;

  constructor(
            public typeArticleSrv: GestionTypeArticleService,
            public articleSrv: GestionArticleService,
            private checkUserSrv: CheckUserService,
            private fb: FormBuilder,
            public gestionChargeSrv: GestionChargeService,
            private date: DateSystemService
            ){
                this.isAuthentificated();
                this.createMainFormControl();
                this.createFormArticle();
            }
          
  isAuthentificated(){
     if(this.checkUserSrv.currentUserData.role !== CREDENTIAL.DIRECTOR_ROLE){
        throw new Error('Cant access this page');
     } 
  }

  createMainFormControl(){
    this.mainFormControl = this.fb.group({
        motif: ['', Validators.required],
        price: ['', Validators.required],
        date: ['', Validators.required]
    });

    this.mainFormControl.controls['date'].setValue(this.date.getFormatDatePremium());
    this.mainFormControl.valueChanges.subscribe((data)=>{
        this.setMainData();
    });
  }

  createFormArticle(){
      this.formControlOnIdSet = this.fb.group({
          idArticle : ['', Validators.required],
          qte :['', Validators.required],
          motif: ['', Validators.required],
          price: ['', Validators.required],
          date: ['', Validators.required]
      });

    this.formControlOnIdSet.controls['date'].setValue(this.date.getFormatDatePremium());
      this.formControlOnIdSet.valueChanges.subscribe((data)=>{
            this.setArticleData()
      });
  }

  swichTab(){
      if(this.isTabListOpen){
        this.tabList.nativeElement.classList.remove('active');
        this.tabPerte.nativeElement.classList.add('active');
        this.isTabListOpen = false;
      }else{
        this.loadPerte()
        this.tabPerte.nativeElement.classList.remove('active');
        this.tabList.nativeElement.classList.add('active');
        this.isTabListOpen = true;
      }
  }

  switchToArticle(){
      if(!this.isArticle){
        this.renitMainData();
        this.isArticle = true;
      }else{
        this.renitArticleData();
        this.isArticle = false;
      }
  }

  async loadPerte(){
    if(this.gestionChargeSrv.listCharge.length == 0){
       this.gestionChargeSrv.getListCharge();
    }
  }

  setPriceArticle(){
      if(typeof this.perte.idArticle !== 'undefined'){
          const index = this.articleSrv.listArticle.findIndex((article)=> article.idArticle == this.perte.idArticle);
          if(index != -1){
            this.perte.prix = this.articleSrv.listArticle[index].prixUnitaire * this.perte.qte;
            this.formControlOnIdSet.controls['price'].setValue(this.perte.prix);
          }
      }
  }

  isDataRequiredSet(): boolean{
    return this.mainFormControl.valid; 
  }

  isArticleDataSet(): boolean{
    return this.formControlOnIdSet.valid;
  }

  savePerte(){
    if(this.isArticle){
        if(this.isArticleDataSet()){
           this.gestionChargeSrv.createCharge(this.perte);
           this.formControlOnIdSet.reset();

        }else{
             this.gestionChargeSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
        }
    }else{
      if(this.isDataRequiredSet()){

        this.gestionChargeSrv.createCharge(this.perte);
        this.mainFormControl.reset();
        
      }else{
         this.gestionChargeSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
      }
    } 
    this.gestionChargeSrv.close();
  }

  setMainData(){
    this.perte.idArticle = null;
    this.perte.qte = null; 
    this.perte.motif = this.mainFormControl.get('motif')?.value;
    this.perte.prix  = this.mainFormControl.get('price')?.value;
    this.perte.dates  = this.mainFormControl.get('date')?.value;
  }

  setArticleData(){
      this.perte.idArticle = Number.parseInt(this.formControlOnIdSet.get('idArticle')?.value);
      this.perte.prix = this.formControlOnIdSet.get('price')?.value;
      this.perte.qte = this.formControlOnIdSet.get('qte')?.value;
      this.perte.motif = this.formControlOnIdSet.get('motif')?.value;
      this.perte.dates = this.formControlOnIdSet.get('date')?.value;
    }

    renitMainData(){
      this.mainFormControl.reset();
    }
    renitArticleData(){
      this.formControlOnIdSet.reset();
    }

  refresh(){
    this.gestionChargeSrv.getListCharge();
  }
}

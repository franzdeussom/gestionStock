import { CREDENTIAL } from './../../../services/user/user.enum';
import { Article } from './../../../services/gestionArticle/article.model';
import { GestionArticleService } from 'src/services/gestionArticle/gestion-article.service';
import { CheckUserService } from './../../../services/user/check-user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessage } from 'src/app/simpleUserPage/employes/alertMessage.model';
import { DateSystemService } from './../../../services/date/date-system.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { GestionTypeArticleService } from './../../../services/gestionTypeArticle/gestion-type-article.service';
import { TypeArticle } from './../../../services/gestionTypeArticle/typeArticle.model';
import { Component, ViewChild, ElementRef, Type } from '@angular/core';

@Component({
  selector: 'app-director-stock',
  templateUrl: './director-stock.component.html',
  styleUrls: ['./director-stock.component.scss']
})
export class DirectorStockComponent {
  @ViewChild('allArticle') allArticle!: ElementRef;
  @ViewChild('createType') createType!: ElementRef;
  isAllArticleShow : boolean = true;
  newTypeArticle: TypeArticle = new TypeArticle();
  tmpTypeToUpdate: TypeArticle = new TypeArticle();

  listSearch: Article[] = []
  searchValue: string = '';

  newtypeFormControl!: FormGroup;
  updateFormControl!: FormGroup;
  isListOfArticleShow: boolean = false;

  constructor(public typeArticleSrv: GestionTypeArticleService, private ngBmodal: NgbModal,
              private fb: FormBuilder, private dateSystSrv: DateSystemService, private checkUserSrv: CheckUserService,
              public gestionArticleSrv: GestionArticleService
              ){
                this.isAuthentificated();
                this.createConrolForm();
                this.createUpdateFormControl();
                this.buildDateDay();
                this.loadArticle();
              }

  isAuthentificated(){
      if(this.checkUserSrv.currentUserData.role !== CREDENTIAL.DIRECTOR_ROLE){
          throw new Error("can't access this page without authentification !")
      }
  }  

  loadArticle(){
    if(this.gestionArticleSrv.listArticle.length == 0){
      this.gestionArticleSrv.loadArticle();
    }
  }


  createConrolForm(){
    this.newtypeFormControl = this.fb.group({
          name: ['', Validators.required],
          qteCritique: ['', Validators.required],
          prixUnitaire: ['', Validators.required],
          dateCreation: ['', Validators.required]
    });
    this.buildDateDay();
    this.newtypeFormControl.valueChanges.subscribe((data)=>{
        this.setParamNewArticle(data);
    })
  }

  createUpdateFormControl(){
    this.updateFormControl = this.fb.group({
      name: ['', Validators.required],
      qteCritique: ['', Validators.required],
      prixUnitaire: ['', Validators.required],
      dateCreation: ['', Validators.required]
    });
    this.updateFormControl.controls['dateCreation'].setValue(this.dateSystSrv.getFormatDatePremium());
  }

  buildDateDay(){
      this.newtypeFormControl.controls['dateCreation'].setValue(this.dateSystSrv.getFormatDatePremium());
  }

  changeToAllArticle(){
      if(!this.isAllArticleShow){
         this.createType.nativeElement.classList.remove('active');
         this.allArticle.nativeElement.classList.add('active');
         this.isAllArticleShow = true;
      }
  }

  changeToCreateType(){
    if(this.isAllArticleShow){
      this.allArticle.nativeElement.classList.remove('active');
      this.createType.nativeElement.classList.add('active');

      this.isAllArticleShow = false; 
    }
  }

  doSearchArticle(){
      this.listSearch = Array.from(this.gestionArticleSrv.doSearch(this.searchValue));
  }

  doCreationTypeArticle(){
    this.checkingForm();

    if(this.isDataTypeSet()){
      this.typeArticleSrv.createNewType(this.newTypeArticle);
      this.newtypeFormControl.reset();
    }else{
      this.typeArticleSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
    }
    this.typeArticleSrv.close();
  }

  setParamNewArticle(data: any){
    this.newTypeArticle.dateCreation = data.dateCreation;
    this.newTypeArticle.libelle = data.name;
    this.newTypeArticle.prixUnitaire = data.prixUnitaire;
    this.newTypeArticle.qteCritique = data.qteCritique;
  }
  
  checkingForm(){
    if(this.newTypeArticle.prixUnitaire < 0){
      this.newtypeFormControl.controls['prixUnitaire'].setValue(undefined);
    }

    if(this.newTypeArticle.qteCritique <= 0){
      this.newtypeFormControl.controls['qteCritique'].setValue(undefined);
    }
  }

  isDataTypeSet(): boolean{
    return this.newtypeFormControl.valid;
  }

  getAllTypeList(){
      if(!this.isListOfArticleShow){
          this.isListOfArticleShow = true;
          if(this.typeArticleSrv.listTypeOfArticle.length == 0){
              this.typeArticleSrv.getAllType();
          }
      }else{
        this.isListOfArticleShow = false;
      }
  }

  doUpdate(){

      if(this.isDataUpdateSet()){
        if(this.tmpTypeToUpdate.qteCritique > 0 && this.tmpTypeToUpdate.prixUnitaire > 0){
           this.typeArticleSrv.updateType(this.tmpTypeToUpdate);
           this.updateFormControl.reset();
        }else{
          this.updateFormControl.controls['qteCritique'].setValue(undefined);
          this.updateFormControl.controls['prixUnitaire'].setValue(undefined);
          this.typeArticleSrv.activeAlertError('Nombre negatif pas pris en charge !');
        }
      }else{
        this.typeArticleSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
      }
      this.close();
      this.typeArticleSrv.close();
  }

  isDataUpdateSet(): boolean{
    return this.updateFormControl.valid;
  }

  openMoal(content: any, typeToModify: TypeArticle){
      Object.assign(this.tmpTypeToUpdate, typeToModify);
      console.log(this.tmpTypeToUpdate);

      this.ngBmodal.open(content, 
        {
          ariaDescribedBy: 'modal-basic-title'
        });
  }

  close(){
    this.ngBmodal.dismissAll();
  }

  refresh(){
    this.gestionArticleSrv.renitToRefresh();
    this.gestionArticleSrv.loadArticle();
  }
}

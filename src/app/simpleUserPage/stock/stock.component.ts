import { CREDENTIAL } from './../../../services/user/user.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessage } from './../employes/alertMessage.model';
import { GestionTypeArticleService } from './../../../services/gestionTypeArticle/gestion-type-article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckUserService } from './../../../services/user/check-user.service';
import { Article } from './../../../services/gestionArticle/article.model';
import { GestionArticleService } from './../../../services/gestionArticle/gestion-article.service';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
  @ViewChild('allArticle') divAllArticle!: ElementRef;
  @ViewChild('addArticle') divAddArticle!: ElementRef;
  isAllArticle: boolean = true;
  newArticleFormControl!: FormGroup;
  newUpdateFromControl!: FormGroup;

  newArticle: Article = new Article();
  indexType: number = 0;
  listSearch: Article[] = []; 
  searchValue: string = '';

  oldQty: number = 0;
  tmpArticleToUpdate: Article = new Article();

    constructor(public gestionArticleSrv: GestionArticleService,
                private checkuser: CheckUserService,
                public gestionTypeArticle: GestionTypeArticleService,
                private fb: FormBuilder,
                private ngBmodal: NgbModal
                ){ 
                  this.isAuthentificated();
                  this.createFormControl();
                }
    
  isAuthentificated(){
    if(this.checkuser.currentUserData.role !== CREDENTIAL.STOCKEEPER_ROLE){
        throw new Error('Cant access this page');
    }
  }

  createFormControl(){
      this.newArticleFormControl = this.fb.group({
          nomType: ['', Validators.required],
          name: ['', Validators.required],
          qteCourrante: ['', Validators.required]
      });
      this.onFormChange();
  }
  createUpdateFormContorol(){
      this.newUpdateFromControl = this.fb.group({
         qty: ['', Validators.required]
      }) 
  }

  onFormChange(){
    this.newArticleFormControl.valueChanges.subscribe(
      data => {
        console.log(data);
        this.setParamArticle(data);
      }
    )
  }

  changeToAllArticle(){
    if(!this.isAllArticle){
        this.divAddArticle.nativeElement.classList.remove('active');
        this.divAllArticle.nativeElement.classList.add('active');
        this.isAllArticle = true;
    }
  }
  changeToAddArticle(){
    if(this.isAllArticle){
      this.divAllArticle.nativeElement.classList.remove('active');
      this.divAddArticle.nativeElement.classList.add('active');
      this.isAllArticle = false;
    }
  }

  addToTheStock(){

    if(this.isDataSet()){
        this.gestionArticleSrv.doSupply(this.newArticle);
    }else{
        this.gestionArticleSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
    }

    this.gestionArticleSrv.close();
  }
  isDataSet(): boolean{
    return this.newArticleFormControl.valid;
  }

  setParamArticle(data: any){

      const getQtyMin = (index: number)=>{
        return this.gestionTypeArticle.listTypeOfArticle[index].qteCritique;
      }
      const getUnitPrice = (index: number)=>{
        return this.gestionTypeArticle.listTypeOfArticle[index].prixUnitaire;
      }
      const getIdRefType = (index: number)=>{
        return this.gestionTypeArticle.listTypeOfArticle[index].id;
      }

      const index = this.gestionTypeArticle.listTypeOfArticle.findIndex((type => type.libelle === data.nomType));
      
      if(index != -1){
        this.newArticle.idRefType = getIdRefType(index);
        this.newArticle.qteCritique = getQtyMin(index);
        this.newArticle.prixUnitaire = getUnitPrice(index);
        this.newArticle.nomType = data.nomType;
        this.newArticle.nomArticle = data.name;
        this.indexType = index;
        console.log('article change', this.newArticle);
      }

      this.defineTotalArticlePrice();
  }

  defineTotalArticlePrice(){
      this.newArticle.coutTotal = this.newArticle.qteCourrante * this.gestionTypeArticle.listTypeOfArticle[this.indexType].prixUnitaire;
  }


  search(){
    this.listSearch = Array.from(this.gestionArticleSrv.doSearch(this.searchValue));
  }

  openModal(content:any, article: Article){
      Object.assign(this.tmpArticleToUpdate, article);
      this.oldQty = article.qteCourrante;
      this.createUpdateFormContorol();
      this.ngBmodal.open(content);
  }

  close(){
    this.ngBmodal.dismissAll();
  }

  defineTotalPriceNewQty(id: number){
    const index = this.gestionArticleSrv.listArticle.findIndex((article => article.idArticle == id ))
    if(index != -1){
      this.tmpArticleToUpdate.coutTotal = this.tmpArticleToUpdate.qteCourrante * this.tmpArticleToUpdate.prixUnitaire;
    }
  }

  doUpdate(){
      if(this.newUpdateFromControl.valid){
        const newQty = this.newUpdateFromControl.get('qty')?.value;
        if(newQty > this.oldQty){
          this.tmpArticleToUpdate.qteCourrante = newQty;
          this.defineTotalPriceNewQty(this.tmpArticleToUpdate.idArticle);
          this.gestionArticleSrv.updateQty(this.tmpArticleToUpdate);
        }else{
         this.gestionArticleSrv.activeAlertError("Vous ne posseder de droit de diminuer le stock");
        }

      }else{
        this.gestionArticleSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
      }

      this.close();
      this.gestionArticleSrv.close();
  }

  refrech(){
      this.gestionArticleSrv.loadArticle();
  }
}

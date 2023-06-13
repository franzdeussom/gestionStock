import { StatusEmprunt } from './../../app/simpleUserPage/cashier-create-command/statusEmprunt.enum';
import { DateSystemService } from './../date/date-system.service';
import { Ventes } from './../gestionCommandes/Vente.model';
import { AlertMessage } from 'src/app/simpleUserPage/employes/alertMessage.model';
import { Article } from './article.model';
import { Endpoint } from '../Api/endpoint.enum';
import { ApiSystemeService } from './../Api/api-systeme.service';
import { Injectable } from '@angular/core';
import { Alert } from '../AlertInterface/alert.interface';
import { Emprunt } from 'src/app/simpleUserPage/cashier-create-command/emprunt.model';

@Injectable({
  providedIn: 'root'
})
export class GestionArticleService {
  public listArticle : Article[] = [];
  public nbrToTalDarticle: number = 0;
  public coutTotalStock: number = 0;

  public listEmprunt : Emprunt[] = [];

  public listVenteDay: Ventes[] = [];

  public listArticleToSupply: Article[]=[];

  public alert: Alert = new Alert();
  public showAlertSucess: boolean = false;
  public showAlertError: boolean = false;


  constructor(private api: ApiSystemeService , private date:DateSystemService) { }

  loadArticle(){
    this.api.get(Endpoint.LOAD_ALL_ARTICLE).subscribe((resp)=>{
          if(Object.keys(resp).length > 0){
            this.listArticle = Array.from(resp);
            this.analyseStock();
            this.countAllArticle();
            this.getSumTotalStock();
          }
    }, (err)=>{
        console.log('Erreur de chargement:', err);
    });
  }

  doVente(articleVendue: Ventes){

      this.api.post(Endpoint.NEW_VENTE_REQUEST, articleVendue).subscribe((resp)=>{
          if(Object.keys(resp).length > 0){
            this.updateQtyInMainListArticle(articleVendue.idArticle, articleVendue.qteVendue);
           
            this.activeAlertSucess(AlertMessage.VENTE_SUCCESS_CREATED);
            this.listVenteDay.push(articleVendue);
          }
      }, (err)=>{
            this.activeAlertError(AlertMessage.ERROR);
            console.log(err);
      })
  }

  doEmprunt(emprunt: Emprunt){
    this.api.post(Endpoint.SAVE_EMPRUNT, emprunt).subscribe((resp)=>{
      if(Object.keys(resp).length > 0){
        this.updateQtyInMainListArticle(emprunt.idArticle, emprunt.qte);
        this.activeAlertSucess(AlertMessage.EMPRUNT_SUCCESS_CREATED);
      }
    }, (err) =>{
      console.log(err); 
      this.activeAlertError(AlertMessage.ERROR);
    } );
  }

  async updateQtyInMainListArticle(idArticle: number, qtyToReduice: number){
    //on vente, on emprunt
    const index = this.listArticle.findIndex((article: Article)=> article.idArticle == idArticle);
    if(index != -1){
      this.listArticle[index].qteCourrante = this.listArticle[index].qteCourrante - qtyToReduice;
    }
  }

 async localSaveListVente(article: Ventes){
    if(this.listVenteDay.length > 0){
      this.listVenteDay.push(article);
      let model : { date: string, list: Ventes[] } = { date: this.date.getFormatDatePremium(), list: this.listVenteDay};
  
      localStorage.clear();
      localStorage.setItem('VENTE_DAY', JSON.stringify(model));
    }else{
      if(localStorage.length > 0){
        console.log('data found');
        let presentList = this.loadLocalSaveListVente();
        this.listVenteDay = this.listVenteDay.concat(presentList);

        let model : { date: string, list: Ventes[] } = { date: this.date.getFormatDatePremium(), list: this.listVenteDay};
    
        localStorage.clear();
        localStorage.setItem('VENTE_DAY', JSON.stringify(model));
      }else{
        this.listVenteDay.push(article);
        let model : { date: string, list: Ventes[] } = { date: this.date.getFormatDatePremium(), list: this.listVenteDay};
    
        localStorage.clear();
        localStorage.setItem('VENTE_DAY', JSON.stringify(model));
      }
      
    }
  }
 
  loadLocalSaveListVente(): Ventes[]{

    let list = localStorage.getItem('VENTE_DAY');
    let listToReturn: Ventes[]=[];

    if(list){
        let tab : Ventes[]= [];
        tab = tab.concat(Array.from(JSON.parse(list!).list));
        if(tab[0].dates === this.date.getFormatDatePremium()){
          listToReturn = Array.from(tab);
        }else{
          localStorage.clear();
        }
    }

    return listToReturn;
  }

  getAllEmprunt(){
    this.api.get(Endpoint.LOAD_EMPRUNT).subscribe((response)=>{
        if(Object.keys(response).length > 0){
          this.listEmprunt = Array.from(response[0]);
          this.listEmprunt = this.listEmprunt.concat(Array.from(response[1]));
        }
    }, (err)=>{
        console.log(err);
        this.activeAlertError(AlertMessage.ERROR);
    });
  }

  doSearchInEmpruntList(nom: string): Emprunt[]{
    const exec = (emprunt: Emprunt)=>{
      return emprunt.nom.toLowerCase().substring(0, nom.length) === nom.toLowerCase();
    }

    return this.listEmprunt.filter(exec);
  }

  updateEmpruntSatut(index: number){
    const requestBody = { id : this.listEmprunt[index].id, statut: StatusEmprunt.REGLE};

    this.api.post(Endpoint.UPDATE_EMPRUNT_STATUT, requestBody).subscribe((resp)=>{
        if(Object.keys(resp).length > 0){
            this.listEmprunt[index].statut = StatusEmprunt.REGLE;
            this.activeAlertSucess(AlertMessage.UPDATE_EMPRUNT_STATUT_SUCCESS);
        }
    }, (err)=>{
        console.log(err);
        this.activeAlertError(AlertMessage.ERROR);
    });
  }

  deleteEmprunt(index: number, id:number){
    const requestBody = { id : id }
    this.api.post(Endpoint.DELETE_EMPRUNT, requestBody).subscribe((resp)=>{
        if(Object.keys(resp).length > 0){
          this.listEmprunt.splice(1, index);
          this.activeAlertSucess(AlertMessage.DELETE_SUCCESS);
        }
    }, (err)=>{
        console.log(err);
        this.activeAlertError(AlertMessage.ERROR);
    });

  }


  doSupply(article: Article){
    //approvisionnemet des acticle du stock;
    
        const addOnMainList = (articl: Article)=>{
              this.listArticle.push(articl);
        }
      this.api.post(Endpoint.ADD_ARTICLE, article).subscribe((resp) =>{
          if(Object.keys(resp).length > 0){
              addOnMainList(article);
              this.activeAlertSucess(AlertMessage.ADD_ARTICLE_SUCCESS);
            }
      }, ()=>{
            this.activeAlertError(AlertMessage.ERROR);
      });
  }

  updateQty(article: Article){
      this.api.post(Endpoint.UPDATE_ARTICLE_QTY, article).subscribe((resp)=>{
        if(Object.keys(resp).length > 0){
          this.updateOnMainList(article);
          this.activeAlertSucess(AlertMessage.MODIFY_EMPLOYE_SUCCESS);
        }
      }, (err)=>{
        this.activeAlertError(AlertMessage.ERROR);
        console.log(err);
      });
  }
  async updateOnMainList(article: Article){
    const index = this.listArticle.findIndex((artcl => artcl.idArticle == article.idArticle));
    if(index != -1){
      article.qteCourrante = article.qteCourrante + this.listArticle[index].qteCourrante;
      Object.assign(this.listArticle[index], article);
      this.analyseStock();
    }
  }



  doSearch(searchValue: string): Article[]{
      const exec = (article: Article)=>{
        return article.nomArticle.toLowerCase().substring(0, searchValue.length) === searchValue.toLowerCase() || article.nomType.toLowerCase().substring(0, searchValue.length) === searchValue.toLowerCase();
      }

      return this.listArticle.filter(exec);
  }

  async analyseStock(){
    const exec = (article: Article)=>{
      return article.qteCourrante <= article.qteCritique;
    }
    this.listArticleToSupply = Array.from(this.listArticle.filter(exec));
  }




  getListArticleNameByType(type: string): Article[]{ 
    //return a list filter by her type
    const exec = (article: Article)=>{
      return article.nomType === type;
    }  
      return this.listArticle.filter(exec);
   }

   async countAllArticle(){
    this.nbrToTalDarticle = 0;
      this.listArticle.forEach((article)=>{
          this.nbrToTalDarticle = this.nbrToTalDarticle + article.qteCourrante;
      });
   }

   async getSumTotalStock(){
      this.coutTotalStock = 0;
      this.listArticle.forEach((article)=>{
          this.coutTotalStock = this.coutTotalStock + (article.prixUnitaire * article.qteCourrante);
      });
    }

    renitToRefresh(){
      this.nbrToTalDarticle = 0;
      this.coutTotalStock = 0;
    }

  close(){  
      setTimeout(() => {
          this.closeSuccessAlert();
          this.closeErrorAlert()
      }, 3800);
  }

  activeAlertSucess(message: string){
      this.alert.successMessage = message;
      this.showAlertSucess = true;
  }

  activeAlertError(message: string){
      this.alert.errorMessage = message;
      this.showAlertError = true;
  }

  closeSuccessAlert(){
    this.showAlertSucess = false;
  }

  closeErrorAlert(){
    this.showAlertError = false;
  }
}

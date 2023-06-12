import { DateSystemService } from 'src/services/date/date-system.service';
import { AlertMessage } from 'src/app/simpleUserPage/employes/alertMessage.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sanction } from './../../../services/gestionSanction/sanction.model';
import { GestionSanctionService } from './../../../services/gestionSanction/gestion-sanction.service';
import { Employe } from './../../../services/gestionEmployes/employe.model';
import { GestionEmployesService } from './../../../services/gestionEmployes/gestion-employes.service';
import { CheckUserService } from './../../../services/user/check-user.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GestionArticleService } from 'src/services/gestionArticle/gestion-article.service';
import { GestionTypeArticleService } from 'src/services/gestionTypeArticle/gestion-type-article.service';
import { MotifSanction } from 'src/services/gestionSanction/motifSanction.enum';
import { CREDENTIAL } from 'src/services/user/user.enum';

@Component({
  selector: 'app-director-sanction',
  templateUrl: './director-sanction.component.html',
  styleUrls: ['./director-sanction.component.scss']
})
export class DirectorSanctionComponent {
  @ViewChild('newSanction') tabSanction!: ElementRef;
  @ViewChild('allSanction') tabList!: ElementRef;
  isTabListOpen: boolean = false;
  listEmploye : Employe[] = [];

  newSanction : Sanction = new Sanction();
  motifList = MotifSanction;

  sanctionFormControl!: FormGroup;

  constructor(
    public typeArticleSrv: GestionTypeArticleService,
    public articleSrv: GestionArticleService,
    public employeSrv: GestionEmployesService,
    public sanctionSrv: GestionSanctionService,
    private checkUserSrv: CheckUserService,
    private DateSystemService: DateSystemService,
    private fb: FormBuilder
  ){
      this.isAuthentificated();
      this.loadEmploye();
      this.createControlForm();
  }

  isAuthentificated(){
    if(this.checkUserSrv.currentUserData.role !== CREDENTIAL.DIRECTOR_ROLE){
        throw new Error();
    }
  }

  createControlForm(){
    this.sanctionFormControl = this.fb.group({
        nom: ['', Validators.required],
        motif: ['', Validators.required],
        amande: ['', Validators.required],
        date: ['', Validators.required]
    })
    this.sanctionFormControl.controls['date'].setValue(this.DateSystemService.getFormatDatePremium());
    this.sanctionFormControl.valueChanges.subscribe((data)=>{
      this.setData();
    })
  }

  loadEmploye(){
      this.listEmploye = Array.from(this.employeSrv.listEmploye);
      this.listEmploye = this.listEmploye.concat(Array.from(this.employeSrv.listParticularEmploye));
  }

 async loadListSanction(){
        if(this.sanctionSrv.listSanction.length == 0){
            this.sanctionSrv.getAllSanction();
        }

        this.sanctionSrv.close();
  }

  swichTab(){
      if(this.isTabListOpen){
        this.tabList.nativeElement.classList.remove('active');
        this.tabSanction.nativeElement.classList.add('active');
        this.isTabListOpen = false;
      }else{
        this.loadListSanction();
        this.tabSanction.nativeElement.classList.remove('active');
        this.tabList.nativeElement.classList.add('active');
        this.isTabListOpen = true;
      }
  }

  setName(){
      let nom = this.sanctionFormControl.get('nom')?.value;
      const index = this.listEmploye.findIndex((emp)=> (emp.nom + '' + emp.prenom) === nom);
      if(index != -1){
          if(typeof this.listEmploye[index].idUser !== 'undefined'){
            this.newSanction.idUser = this.listEmploye[index].idUser;
            this.newSanction.role = this.listEmploye[index].role;
            this.newSanction.id_employe = null;
          }else{
            this.newSanction.id_employe = this.listEmploye[index].id_employe;
            this.newSanction.idUser = null;
            this.newSanction.poste = this.listEmploye[index].poste;

          }
          this.newSanction.nom = this.listEmploye[index].nom;
          this.newSanction.prenom = this.listEmploye[index].prenom;

      }
  }

  setAmande(){

  }

  setData(){
    this.newSanction.dates = this.sanctionFormControl.get('date')?.value;
    this.newSanction.motif = this.sanctionFormControl.get('motif')?.value;
    this.newSanction.amande = this.sanctionFormControl.get('amande')?.value;
  }

  createSanction(){

    if(this.isAllDataSet()){
      this.sanctionSrv.creeSanction(this.newSanction);
    }else{
      this.sanctionSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
    }
     this.sanctionSrv.close();
  }

  delSanction(id: number, index: number){
    this.sanctionSrv.delete(id, index);
    this.sanctionSrv.close();
  }

  isAllDataSet(): boolean{
    return this.sanctionFormControl.valid;
  }

  refrech(){
    this.sanctionSrv.getAllSanction();
  }
}

import { CREDENTIAL } from './../../../services/user/user.enum';
import { CheckUserService } from './../../../services/user/check-user.service';
import { Alert } from './../../../services/AlertInterface/alert.interface';
import { AlertMessage } from './../employes/alertMessage.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GestionEmployesService } from './../../../services/gestionEmployes/gestion-employes.service';
import { Employe } from './../../../services/gestionEmployes/employe.model';
import { GestionCongeService } from './../../../services/Conge/gestion-conge.service';
import { DemandeConge } from './../../../services/Conge/conge.model';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.scss']
})
export class DemandeCongeComponent implements OnInit{
  @ViewChild('allEmp') allEmp!: ElementRef;
  @ViewChild('addEmp') addEmp!: ElementRef;
  closeResult: string = '';

  newHolidayRequest: DemandeConge = new DemandeConge();
  listRequestApprouved: DemandeConge[];
  listEmploye: Employe[];
  isCreateHolidayBarActive: boolean = true
  holidayForm!: FormGroup;
  searchValue: string = '';
  listSearchRslt: DemandeConge[] = [];

    constructor( public congeSrv: GestionCongeService, private employeSrv: GestionEmployesService,
                 private fb: FormBuilder, private chckUserSrv: CheckUserService
                ){
        this.isAuthentificated();
        this.createFormValidation();
        this.listRequestApprouved = new Array<DemandeConge>();
        this.listEmploye = new Array<Employe>();
    }
    
    ngOnInit(): void {
        this.loadListEmploye();
    }

    isAuthentificated(){
      if(this.chckUserSrv.currentUserData.role !== CREDENTIAL.DIRECTOR_ROLE){
          throw new Error();
      }
    }

  createFormValidation(){
      this.holidayForm = this.fb.group({
          name: ['', Validators.required],
          dateDepart: ['', Validators.required],
          dateRetour: ['', Validators.required],
          reason : ['', Validators.required],
          posteEmploye: ['', Validators.required]
      })
  }
  changeToCreateHoliday(){
    if(!this.isCreateHolidayBarActive){
      this.addEmp.nativeElement.classList.remove('active');
      this.allEmp.nativeElement.classList.add('active');
      this.isCreateHolidayBarActive= true;
    }
  }

  changeToHolidayApprouve(){
    if(this.isCreateHolidayBarActive){
      this.loadListEmployeInHolidays();
      this.allEmp.nativeElement.classList.remove('active');
      this.addEmp.nativeElement.classList.add('active');
      this.isCreateHolidayBarActive = false;

    }   
  }

  loadListEmploye(){
    this.listEmploye = Array.from(this.employeSrv.listEmploye);
    this.listEmploye = this.listEmploye.concat(this.employeSrv.listParticularEmploye);
  }

 async loadListEmployeInHolidays(){
    if(this.congeSrv.listHolidayRequest.length == 0){
      this.congeSrv.getAllRequest();
    }
  }

  refresh(){
    this.congeSrv.listHolidayRequest = [];
    this.congeSrv.getAllRequest();
  }

  doCreateRequest(){

      if(this.checkRequest()){
          this.congeSrv.createHolidayRequest(this.newHolidayRequest);
      } else{
        this.congeSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
      }
      this.holidayForm.reset();
      this.congeSrv.close();
   }

   deleteHolidays(id: number, index: number, isFromSeachList: boolean){
        this.congeSrv.deleteRequest(id, index, isFromSeachList);
        this.congeSrv.close();
   }

   checkRequest(): boolean{
      return this.holidayForm.valid;
   }

   doSearch(){
          this.listSearchRslt = Array.from(this.congeSrv.doSearch(this.searchValue));
   }

   checkUser(nom: any){
      const index = this.listEmploye.findIndex((empl => empl.nom + ' ' + empl.prenom === nom));

      if(typeof this.listEmploye[index].idUser === 'undefined'){
          this.newHolidayRequest.idUser = null;
          this.newHolidayRequest.poste = this.listEmploye[index].poste;
          this.newHolidayRequest.id_employe = this.listEmploye[index].id_employe;
      }else{
          this.newHolidayRequest.id_employe = null;
          this.newHolidayRequest.poste = this.listEmploye[index].role;
          this.newHolidayRequest.idUser = this.listEmploye[index].idUser;
      }
   }
}

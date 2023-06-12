import { CREDENTIAL } from './../../../services/user/user.enum';
import { SystemUser } from './../../../services/user/systemUser.model';
import { CheckUserService } from './../../../services/user/check-user.service';
import { TypeUser } from './../../../services/gestionEmployes/typeUser.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertMessage } from './alertMessage.model';
import { GestionEmployesService } from './../../../services/gestionEmployes/gestion-employes.service';
import { Employe } from './../../../services/gestionEmployes/employe.model';
import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss']
})

export class EmployesComponent implements OnInit {
  @ViewChild('allEmp') allEmp!: ElementRef;
  @ViewChild('addEmp') addEmp!: ElementRef;
  @ViewChild('emp') simple_emp!: ElementRef;
  @ViewChild('particular') particular!: ElementRef;

  isAllEmpBarActive: boolean = true;
  isParticulart: boolean = false;

  listEmploye!: Employe[];
  listSearchReslt!: Employe[];

  listParticular!: SystemUser[];
  listSearchParticularReslt!: SystemUser[];
  valueSearch: string = ''; //particular entry to search

  searchValue: string = '';//employe entry to search
  closeResult = '';

  newEmploye: Employe = new Employe();
  tmpUserDataToDelete: Employe = new Employe();
  tmpUserDataToModify: Employe = new Employe();

  newEmployeForm!: FormGroup;
  newEmployeModifyControl!: FormGroup;

  newUser: SystemUser = new SystemUser();
  newGenerate!: FormGroup;

  constructor(private ngBmodel: NgbModal, public employeSrv: GestionEmployesService,
              private fb: FormBuilder, private dtch: ChangeDetectorRef, public checkUserSvr: CheckUserService
              ){
                this.isDataUserSet();
                this.createEmployeFormControl();
                this.createEmployeModifyFormControl();
                this.createGenerateFormControl();

                if(this.employeSrv.listEmploye.length == 0){
                    this.employeSrv.loadAllEmploye();
                }
              }

  ngOnInit(): void {
    this.loadEmployeList();
  }

  ngAfterViewChecked() {
    this.loadEmployeList();
    this.dtch.detectChanges();
  }

  isDataUserSet(){
    if(this.checkUserSvr.currentUserData.role !== CREDENTIAL.ADMIN_ROLE && this.checkUserSvr.currentUserData.role !== CREDENTIAL.DIRECTOR_ROLE){
        throw new Error("Can't access this page, authentification required !");
    }
  }

  createEmployeFormControl(){
    this.newEmployeForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      poste: ['', Validators.required],
      CNI : ['', Validators.required]
    })
  }

  createEmployeModifyFormControl(){
      this.newEmployeModifyControl = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', Validators.required],
        tel: ['', Validators.required],
        poste: ['', Validators.required],
        CNI : ['', Validators.required]
      });
  }

 async createGenerateFormControl(){
      this.newGenerate = this.fb.group({
          name: ['', Validators.required],
          surname: ['', Validators.required],
          mail: ['', Validators.required],
          tel: ['', Validators.required],
          cni: ['', Validators.required],
          role: ['', Validators.required]
      });
      this.newUser.nom = '';
      this.newUser.prenom = '';
      this.newUser.role ='';
      this.newUser.email ='';
      this.newGenerate.valueChanges.subscribe((data)=>{
            this.setGenerateUserData(data);
      })
  }

  changeToAllEmploye(){
    if(!this.isAllEmpBarActive){
      this.addEmp.nativeElement.classList.remove('active');
      this.allEmp.nativeElement.classList.add('active');
      this.isAllEmpBarActive = true;
    }
  }

  changeToAddEmp(){
    if(this.isAllEmpBarActive){
      this.allEmp.nativeElement.classList.remove('active');
      this.addEmp.nativeElement.classList.add('active');
      this.isAllEmpBarActive = false;
    } 
    this.changeToEmploye();
  }
  
  changeToEmploye(){
    if(this.isParticulart){
        this.particular.nativeElement.classList.remove('active');
        this.simple_emp.nativeElement.classList.add('active');
        this.isParticulart = false;
    }
  }
  changeToParticular(){
    if(!this.isParticulart){
      this.simple_emp.nativeElement.classList.remove('active');
      this.particular.nativeElement.classList.add('active');
      this.isParticulart = true;
  }
  }

  async loadEmployeList(){
        this.listEmploye = Array.from(this.employeSrv.listEmploye);
        this.listParticular = Array.from(this.employeSrv.listParticularEmploye);  
  }

  doSearch(){
      this.listSearchReslt = Array.from(this.employeSrv.searchInMainList(this.searchValue));
  }

  doParticularSearch(){
        this.listSearchParticularReslt = Array.from(this.employeSrv.searchInParticular(this.valueSearch));
  }

  doRegisterEmploye(){

    if(this.checkEmployeData()){
       this.employeSrv.register(this.newEmploye);
       this.newEmployeForm.reset();
      }else{
      this.employeSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
    }
    
    this.employeSrv.close();
    
  }

  checkEmployeData(): boolean{
    return this.newEmployeForm.valid;
  }

  openModifyModal(content: any, employe: Employe){
        Object.assign(this.tmpUserDataToModify, employe);
        this.doOpen(content);
  }

  doUpdateEmploye(){

  let typeUser = TypeUser.EMPLOYE;

   if(this.checkNewEmployeData()){
    this.employeSrv.updateEmploye(this.tmpUserDataToModify, typeUser);
   }else{
    this.employeSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
   }

  // this.renitObject();
   this.employeSrv.close();
   this.close()
}

checkNewEmployeData(): boolean{
  return this.newEmployeModifyControl.valid
}

  openModal(content: any, dataUser: any){
      
    Object.assign(this.tmpUserDataToDelete, dataUser);
  
     this.doOpen(content);
  }
  
  doOpen(content: any){
    this.ngBmodel.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('reasean dismiss:', this.closeResult);
    });
  }

  //deleteEmploye
  doDelete(){
     const typeUser = TypeUser.EMPLOYE ;
     this.employeSrv.deleteEmploye(this.tmpUserDataToDelete, this.tmpUserDataToDelete.nom, typeUser);
    console.log(this.tmpUserDataToDelete);

      this.close();

    // this.renitObject();
     this.employeSrv.close();
  }

  doDeleteParticular(){
    const typeUser = TypeUser.SYTEME_USER;
    this.employeSrv.deleteEmploye(this.tmpUserDataToDelete, this.tmpUserDataToDelete.nom, typeUser);
    this.close();

    this.renitObject();
   this.employeSrv.close();
  }

  refresh(){
      this.listParticular = [];
      this.listEmploye = [];
      this.employeSrv.loadAllEmploye();
      setTimeout(() => {
          this.loadEmployeList();
      }, 1200);
  }

  renitObject(){
    this.tmpUserDataToDelete.idUser = undefined;
    this.tmpUserDataToDelete.id_employe = undefined;
    this.tmpUserDataToModify.poste = undefined;
    this.tmpUserDataToModify.role = undefined;
  }

  close(){
    this.ngBmodel.dismissAll();
  }

  doOpenPModal(content: any){
      this.createGenerateFormControl();
      this.ngBmodel.open(content);
  }

  setGenerateUserData(data: any){
      this.newUser.nom = data.name;
      this.newUser.prenom = data.surname;
      this.newUser.email = data.mail;
      this.newUser.tel = data.tel;
      this.newUser.role = data.role;
      this.newUser.cni = data.cni;
      this.newUser.generatedBy = this.checkUserSvr.currentUserData.nom + '' + this.checkUserSvr.currentUserData.prenom;
      this.newUser.endValidity = this.checkUserSvr.currentUserData.endValidity;
  }

  generateUser(){

      if(this.newGenerate.valid){
          this.newUser.mdp = this.checkUserSvr.generatePassword();
          this.employeSrv.doRegister(this.newUser);
          let tmp = new SystemUser();
          Object.assign(tmp, this.newUser);
          this.newGenerate.reset();
          Object.assign(this.newUser, tmp);

      }else{
        this.employeSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
      }
      
      this.employeSrv.close();
  }

  closeGenerateModal(){
      this.checkUserSvr.isGenrateUserComplte = false;

      this.newGenerate.reset();
      this.ngBmodel.dismissAll();
  }


  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
  
    }
  
}

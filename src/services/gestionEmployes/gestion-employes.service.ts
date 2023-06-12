import { DemandeConge } from './../Conge/conge.model';
import { SystemUser } from './../user/systemUser.model';
import { TypeUser } from './typeUser.enum';
import { CheckUserService } from './../user/check-user.service';
import { DateSystemService } from './../date/date-system.service';
import { Statut } from './typePresence.enum';
import { Presence } from './presence.model';
import { Endpoint } from './../Api/endpoint.enum';
import { ApiSystemeService } from './../Api/api-systeme.service';
import { Employe } from './employe.model';
import { Injectable } from '@angular/core';
import { Alert } from '../AlertInterface/alert.interface';
import { AlertMessage } from 'src/app/simpleUserPage/employes/alertMessage.model';

@Injectable({
  providedIn: 'root'
})

export class GestionEmployesService {
  public listEmploye: Employe[] = [];
  public listParticularEmploye: Employe[] = [];

  public defaultListEmploye!: Employe[]; 
  public defaultDateDay: string = '';

  listUserPresent: Presence[];
  listParticularPresent: Presence[] = [];
  
  public alert: Alert = new Alert();
  public showAlertSucess: boolean = false;
  public showAlertError: boolean = false;

  isGenrateUserComplte: boolean = false;

  globalListPresent: Presence[] = [];

  constructor(private api: ApiSystemeService, private date: DateSystemService,
              private checkUserSrv: CheckUserService
              ) {
      this.defaultDateDay = this.date.getFormatDatePremium();
      this.listUserPresent = new Array<Presence>();
   }

  loadAllEmploye(){ 
      const requestBody = { id: this.checkUserSrv.currentUserData.idUser }
      this.api.post(Endpoint.LOAD_ALL_EMPLOYE, requestBody).subscribe((resp)=>{
            if(Object.keys(resp).length > 0){
                this.listEmploye = Array.from(resp[1]);
                this.listParticularEmploye = Array.from(resp[0]);
                this.buildListPresence();
            }
      });
  }

  register(employe: Employe){
      employe.idUser = this.checkUserSrv.currentUserData.idUser;
      employe.profilUrl = null;
      this.api.post(Endpoint.REGISTER_EMPLOYE, employe).subscribe((resp)=>{
          if(Object.keys(resp).length > 0){
            this.activeAlertSucess(AlertMessage.CREATE_EMPLOYE_SUCCESS);
            this.listEmploye.push(employe);
          }
      });
  }

  doRegister(user: SystemUser){
    //user
    this.api.post(Endpoint.REGISTER_USER, user).subscribe((resp)=>{
        if(Object.keys(resp).length > 0){
            this.activeAlertSucess(AlertMessage.CREATE_EMPLOYE_SUCCESS);
            this.isGenrateUserComplte = true;
          }
    }, (err)=>{
        console.log(err);
        this.activeAlertError(AlertMessage.ERROR);
    });
  }

  
  updateEmploye(newEmployeData: Employe, typeUser: string){
    const requestBody = { typeUser: typeUser, data: newEmployeData };
    this.api.post(Endpoint.UPDATE_EMPLOYE, requestBody).subscribe((resp)=>{
        if(Object.keys(resp).length > 0){
          this.updateOnListEmploye(newEmployeData.id_employe, newEmployeData);
          this.activeAlertSucess(AlertMessage.MODIFY_EMPLOYE_SUCCESS);
          
        }
    }, (err)=>{
      this.activeAlertError(AlertMessage.ERROR);
  });

  }

  deleteEmploye(data: Employe, nom: string, typeUser: string){
      const requestBody = { typeUser: typeUser, data: data };
      this.api.post(Endpoint.DELETE_EMPLOYE, requestBody).subscribe((resp)=>{
         
        if(Object.keys(resp).length > 0){              
              if(typeUser === TypeUser.SYTEME_USER){
                this.deleteOnListUsers(data.idUser);
              } else{
                this.deleteOnListEmploye(data.id_employe);
              }
              this.activeAlertSucess(AlertMessage.DELETE_SUCCESS);
        }
      }, (err)=>{
          this.activeAlertError(AlertMessage.ERROR);
      });

  }

  deleteOnListEmploye(id:number){
     const index = this.listEmploye.findIndex((employe => employe.id_employe == id));
      this.listEmploye.splice(index, 1);
  }

  deleteOnListUsers(id:number){
    const index = this.listParticularEmploye.findIndex((employe => employe.idUser == id));
      this.listParticularEmploye.splice(index, 1);
  }

  updateOnListEmploye(id:number, data: Employe){
    const index = this.listEmploye.findIndex((employe => employe.id_employe == id));
    if(index != -1){
        Object.assign(this.listEmploye[index], data);
    }
  }

  updateOnlistUser(id:number, data: Employe){
      const index = this.listEmploye.findIndex((employe => employe.idUser = id));
      if(index != -1){
          Object.assign(this.listEmploye[index], data);
      }
  }

  

  //etablish presence list
  changeStatutUserToPresent(index: number){
      this.listUserPresent[index].statut = Statut.PRESENT;
  }
  changeStatutUserToAbsent(index: number){
      this.listUserPresent[index].statut = Statut.ABSENT;
  }

  changeStatutParticularToPresent(index: number){
    this.listParticularPresent[index].statut = Statut.PRESENT;

  }
  changeStatutParticularToAbsent(index: number){
      this.listParticularPresent[index].statut = Statut.ABSENT;
  }

  savePresenceList(dateDay: string, isParticulartEmploye: boolean){
    //save list in database
    let listToSave = [];

    if(isParticulartEmploye){
        this.listParticularPresent.map(
          empl => empl.dateDay = dateDay
        )
        listToSave = Array.from(this.listParticularPresent);

    }else{
      this.listUserPresent.map(
        empl => empl.dateDay = dateDay
      );
      listToSave = Array.from(this.listUserPresent);
    }
    
    this.api.post(Endpoint.SAVE_PRENSENCE_EMPLOYE, listToSave).subscribe((resp)=>{
        if(Object.keys(resp).length > 0){
           this.activeAlertSucess(AlertMessage.PRESENCE_LIST_SUCESS);
        }
    }, (err)=>{
          this.activeAlertError(AlertMessage.ERROR);
    });
  
  }

  getRapportPresence(){
      this.api.get(Endpoint.RAPPORT_PRESENCE).subscribe((resp)=>{
            if(Object.keys(resp).length > 0){
                this.globalListPresent = resp[0];
                this.globalListPresent = this.globalListPresent.concat(resp[1]);
            }
      }, (err)=>{
            console.log(err);
            this.activeAlertError(AlertMessage.ERROR);
      });
  }

  searchInPresenceList(value: string): Presence[] {
        const exe = (presence: Presence)=>{
            return presence.nom?.toLowerCase().substring(0, value.length) === value.toLowerCase() || presence.prenom?.toLowerCase().substring(0, value.length) === value.toLowerCase() 
            || presence.statut?.toLowerCase().substring(0, value.length) === value.toLowerCase() || presence.dateDay === value;
        }

        return this.globalListPresent.filter(exe);
  }

  saveLocalyPresenceList(){

  }

  buildListPresence(){
    this.listUserPresent = [];
    this.listEmploye.forEach((employe, index)=>{
        this.listUserPresent.push({
          nom: employe.nom,
          prenom: employe.prenom,
          idUser: null,
          idEmploye : employe.id_employe,
          poste: employe.poste,
          role : employe.role,
          heureArrive: undefined,
          dateDay: undefined,
          heureDepart: undefined,
          statut: Statut.ABSENT
        });
    });
    this.buildListPresencOfParticular();
  }

  buildListPresencOfParticular(){
      this.listParticularPresent = [];
      this.listParticularEmploye.forEach((employe)=>{
            this.listParticularPresent.push({
              nom: employe.nom,
              prenom: employe.prenom,
              idUser: employe.idUser,
              idEmploye: null,
              role: employe.role,
              heureArrive: undefined,
              dateDay: undefined,
              heureDepart: undefined,
              statut: Statut.ABSENT
            });
      });
  }

  searchInMainList(searchValue: string): Employe[]{
        const execSearch = (employe: Employe)=>{
            return employe.nom?.toLowerCase().substring(0, searchValue.length) === searchValue.toLowerCase() || employe.prenom?.toLowerCase().substring(0, searchValue.length) === searchValue.toLowerCase();
        }

        return this.listEmploye.filter(execSearch);
  }

  searchInParticular(valueSearch: string): SystemUser[]{
        const execSearch = (user: SystemUser)=>{
          return user.nom?.toLowerCase().substring(0, valueSearch.length) === valueSearch.toLowerCase() || user.prenom?.toLowerCase().substring(0, valueSearch.length) === valueSearch.toLowerCase();
        }

        return this.listParticularEmploye.filter(execSearch);
  }


  close(){  
      setTimeout(() => {
          this.closeSuccessAlert();
          this.closeErrorAlert()
      }, 2500);
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

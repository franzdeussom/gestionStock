import { AlertMessage } from 'src/app/simpleUserPage/employes/alertMessage.model';
import { Alert } from 'src/services/AlertInterface/alert.interface';
import { Router } from '@angular/router';
import { CREDENTIAL } from './user.enum';
import { Endpoint } from './../Api/endpoint.enum';
import { ApiSystemeService } from './../Api/api-systeme.service';
import { SystemUser } from './systemUser.model';
import { Injectable } from '@angular/core';
import { DateValidityService } from '../developper/date-validity.service';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService {
  public currentUserData: SystemUser = new SystemUser();
  public isAdmin: boolean = false;
  public isStockeeper: boolean = false;
  public isDirector: boolean = false;
  public isCashier: boolean = false;
  public isDevelopper: boolean = false;
  public isSingUpOk : boolean  = false;
  public showAlertError: boolean = false;
  
  public alert : Alert = new Alert();
  
  public showAlertSucess: boolean = false;
  public showAlertErrorApi: boolean = false;
  isGenrateUserComplte: boolean = false;

  constructor(private api: ApiSystemeService, private route: Router, private dateVldty: DateValidityService) { }

  activeAlertError(message: string){
    this.alert.errorMessage = message;
    this.showAlertError = true;
  }

  closeErrorAlert(){
    this.showAlertError = false;
  }

  activeAlertSucess(message: string){
    this.alert.successMessage = message;
    this.showAlertSucess = true;
  }

  closeSuccessAlert(){
    this.showAlertSucess = false;
  }

  close(){
    setTimeout(() => {
        this.closeErrorAlert();
        this.closeSuccessAlert();
    }, 5000);   
  }

  public doLogin(credential: SystemUser){ 
    credential.endValidity = this.dateVldty.getCurrentDate();
    this.api.post(Endpoint.login, credential).subscribe((data)=>{
            if(Object.keys(data).length > 0){ 
                if(data.data[0].role === CREDENTIAL.DEVELOPPER_ROLE){
                    
                    this.checkUser(data.data[0]);
                }else{
                    if(data.isValid){
                        this.checkUser(data.data[0]);
                    }else{
                        this.activeAlertError(data.message);  
                    }
              }
            }else{
                this.activeAlertError('email ou mot de passe incorrect !');
            }
            this.close();
      });
      
  }


  checkUser(user: SystemUser){
    let defaultRoute = 'login';

    //change after to role
    switch(user.role){
      case CREDENTIAL.STOCKEEPER_ROLE: 
        this.isStockeeper = true;
        this.currentUserData.role = CREDENTIAL.STOCKEEPER_ROLE;
        defaultRoute = CREDENTIAL.STOCKEEPER_HOME_ROUTE;
        this.isSingUpOk = true

        break;

      case CREDENTIAL.ADMIN_ROLE:
        this.isAdmin = true;
        this.currentUserData.role = CREDENTIAL.ADMIN_ROLE; 
        defaultRoute = CREDENTIAL.ADMIN_HOME_ROUTE;
        this.isSingUpOk = true
        break;

      case CREDENTIAL.CASHIER_ROLE:
        this.isCashier = true;
        this.currentUserData.role = CREDENTIAL.CASHIER_ROLE;
        defaultRoute = CREDENTIAL.CASHIER_HOME_ROUTE;
        this.isSingUpOk = true
        break;

      case CREDENTIAL.DIRECTOR_ROLE:
        this.isDirector = true;
        this.currentUserData.role = CREDENTIAL.DIRECTOR_ROLE;
        defaultRoute = CREDENTIAL.DIRECTOR_HOME_ROUTE;
        this.isSingUpOk = true
        break;
        
      case CREDENTIAL.DEVELOPPER_ROLE:
        this.isDevelopper = true;
        this.currentUserData.role = CREDENTIAL.DEVELOPPER_ROLE;
        defaultRoute = CREDENTIAL.DEVELOPPER_HOME_ROUTE;
        this.isSingUpOk = true;
        break
    }
    Object.assign(this.currentUserData, user);
    
    this.route.navigateByUrl(defaultRoute);
  }

  resetApp(){
    this.isSingUpOk = false;
    this.isAdmin = false;
    this.isCashier = false;
    this.isDirector  = false;
    this.isStockeeper = false;
  }

  updateAccount(data: SystemUser){
      this.api.post(Endpoint.UPDATE_USER_PASSWORD, data).subscribe((resp)=>{
            if(Object.keys(resp).length > 0){
                this.activeAlertSucess(AlertMessage.MODIFY_EMPLOYE_SUCCESS);
            }
      }, (err)=>{
          this.activeAlertError(AlertMessage.ERROR);
          console.log(err);
      })
  }

  generatePassword(): string{
      const value = 'aAbBcCdDeEfFgGhHiIjKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ1234567890';
      let password = '';
      for(let i=0; i <= 17; i++){
          let random = Math.floor(Math.random() * value.length);
          password = password + value.charAt(random); 
      }

      return password;
  }

  logout(){
      this.resetApp();
      window.location.href = '/?id=' + new Date().getTime(); 
      this.route.navigateByUrl(CREDENTIAL.NAVIGATE_TO_LOGIN);   
  }
}

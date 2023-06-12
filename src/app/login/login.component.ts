import { CREDENTIAL } from 'src/services/user/user.enum';
import { AlertMessage } from './../simpleUserPage/employes/alertMessage.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckUserService } from './../../services/user/check-user.service';
import { SystemUser } from './../../services/user/systemUser.model';
import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/services/AlertInterface/alert.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: SystemUser = new SystemUser();
  formSignIn!: FormGroup;
  typeInput : string = 'password';
  constructor(
            private route: Router,
            public checkUserSrv: CheckUserService,
            private fb: FormBuilder
             ){
              this.createFormSignInControl();
             }

  ngOnInit() {

  }

  createFormSignInControl(){
      this.formSignIn = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
  }

  doLogin(){
    
    if(this.isCredentialValid()){
       this.checkUserSrv.doLogin(this.user);
    }else{
        this.checkUserSrv.activeAlertError(AlertMessage.EMPTY_FIELD);
        this.checkUserSrv.close();
    }
    
  }

  isCredentialValid(){
    return this.formSignIn.valid;
  }

  showPassword(){
      if(this.typeInput === 'password'){
          this.typeInput = 'text';
      }else{
          this.typeInput = 'password';
      }
  }
 
}

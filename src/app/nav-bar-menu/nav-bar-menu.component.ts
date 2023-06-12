import { AlertMessage } from 'src/app/simpleUserPage/employes/alertMessage.model';
import { SystemUser } from './../../services/user/systemUser.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckUserService } from './../../services/user/check-user.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav-bar-menu',
  templateUrl: './nav-bar-menu.component.html',
  styleUrls: ['./nav-bar-menu.component.scss']
})
export class NavBarMenuComponent {
    password: string = '';
    formModif!: FormGroup;
    user: SystemUser = new SystemUser();
    isConfirmPassOk: boolean = false;

    constructor(
          public checkingUser: CheckUserService,
          private NgbModal: NgbModal,
          private fb: FormBuilder
    ){ 
        this.createFormControl();
     }


    createFormControl(){
        this.formModif = this.fb.group({
          newPassword: ['', Validators.required],
          confirmPassword: ['', Validators.required]
        });

        this.formModif.valueChanges.subscribe((data)=>{
            this.setNewData(data);
        })

    }

    setNewData(data: any){
        this.user.mdp = data.newPassword;

    }

    checkConfirmPass(){
      if(this.user.mdp !== this.formModif.get('confirmPassword')?.value){
          this.checkingUser.activeAlertError('mot de passe de confirmation different que le nouveau mot de passe.')
          this.isConfirmPassOk = true;
      }else{
        this.checkingUser.closeErrorAlert();
      }
    }

    doModifAccount(){
      const isPasswordCorrect = ()=>{
        return this.checkingUser.currentUserData.mdp === this.password
      }
      if(this.formModif.valid){
        if(this.isConfirmPassOk){

           if(isPasswordCorrect()){

              Object.assign(this.user, this.checkingUser.currentUserData);
              this.user.mdp = this.formModif.get('newPassword')?.value;
              this.checkingUser.updateAccount(this.user); 

            }else{
              //error mot de pass invalid
              this.checkingUser.activeAlertError('mot de passe de compte ne concorde pas! Ressayez..')
            }
        }
        
      }else{
        // empty field
        this.checkingUser.activeAlertError(AlertMessage.EMPTY_FIELD);
      }
      this.formModif.reset();
      this.checkingUser.close();
    }

  openModalModif(content: any){
      this.NgbModal.open(content);
  }

  close(){
      this.NgbModal.dismissAll();
      this.formModif.reset();
  }

  logOut(){
    this.checkingUser.logout();
  }
  
}

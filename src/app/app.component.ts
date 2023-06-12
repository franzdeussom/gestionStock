import { CheckUserService } from './../services/user/check-user.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CREDENTIAL } from 'src/services/user/user.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarExpanded = true;
  isAdmin : boolean = false;
  isStockeeper : boolean = false;
  isDirector : boolean = false;
  isCashier : boolean = false;

  isAuthentificated: boolean = false;

  credential = CREDENTIAL;

      constructor(private navCtrl: Router, public checkUserCredential: CheckUserService,
                  private ref: ChangeDetectorRef
                ){

      }
  
      ngAfterViewChecked() {
          this.checkAuthentication();
          this.ref.detectChanges();
      }

  checkAuthentication(){
    this.isAdmin = this.checkUserCredential.isAdmin;
    this.isCashier  = this.checkUserCredential.isCashier;
    this.isDirector = this.checkUserCredential.isDirector;
    this.isStockeeper = this.checkUserCredential.isStockeeper;
    
    this.isAuthentificated = this.checkUserCredential.isSingUpOk;
  }
}

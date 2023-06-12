import { CheckUserService } from 'src/services/user/check-user.service';
import { Alert } from 'src/services/AlertInterface/alert.interface';
import { UpdateService } from 'src/services/developper/update.service';
import { DateValidityService } from './../../../services/developper/date-validity.service';
import { Validity } from './validity.enum';
import { Component } from '@angular/core';
import { CREDENTIAL } from 'src/services/user/user.enum';

@Component({
  selector: 'app-developper',
  templateUrl: './developper.component.html',
  styleUrls: ['./developper.component.scss']
})
export class DevelopperComponent {
  validity = Validity;
  choice: string = '';
  guiDate: string = '';
  finalValidityDate: string = '';

  constructor(private dateDevSrv: DateValidityService,
              public devUpdateSrv: UpdateService,
              public chckUserSrv: CheckUserService
             ){this.hasAuthority()}

    
  hasAuthority(){
    if(this.chckUserSrv.currentUserData.role !== CREDENTIAL.DEVELOPPER_ROLE){
      throw new Error();
  }
  }
  setValidity(){
    this.finalValidityDate = this.dateDevSrv.getDateValidity(this.choice);
    this.guiDate = this.dateDevSrv.guiDate;
    
  }

  doUpdate(){
      this.devUpdateSrv.doUpdate(this.finalValidityDate);
       
    }

   

}

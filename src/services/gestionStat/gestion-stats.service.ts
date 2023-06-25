import { AlertMessage } from './../../app/simpleUserPage/employes/alertMessage.model';
import { Endpoint } from './../Api/endpoint.enum';
import { CheckUserService } from 'src/services/user/check-user.service';
import { Statistique } from './statistique.model';
import { ApiSystemeService } from './../Api/api-systeme.service';
import { Injectable } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Alert } from '../AlertInterface/alert.interface';


@Injectable({
  providedIn: 'root'
})
export class GestionStatsService {
  public stats: Statistique = new Statistique();
  isStatsLoad: boolean = false;

  salesData!: ChartData<'line'>;
  chartOptions!: ChartOptions;

  showAlertSucess: boolean = false;
  showAlertError: boolean = false;
  alert: Alert = new Alert();

  constructor(private api: ApiSystemeService, private checkUser: CheckUserService) { }

  loadStats(){
      const credential = { role : this.checkUser.currentUserData.role, to: 'SECURITY'}
      this.api.post(Endpoint.STATS_CHARTS, credential).subscribe((resp)=>{
          if(Object.keys(resp).length > 0){

               Object.assign(this.stats, resp);
               this.buildChart()
               this.isStatsLoad = true;
          }
      }, (err)=>{
          this.activeAlertError(AlertMessage.ERROR + err.message);
      })
  }

  buildChart(){
    this.salesData = {
      labels: [' REPRESENTATION (FCFA)'],
      datasets: [
            {label: 'Cout du Stock Actuel', data: [this.stats.coutsStockActuel] },
            {label: 'Sommes des Ventes', data: [this.stats.coutVente] },
            {label: 'Cout des Charges', data: [this.stats.coutCharge] },
            {label: 'Montant des Emprunts', data: [this.stats.montantEmprunt] },
            {label: 'Revenue Exact (Revenue exact - (emprunt + charge))', data: [((this.stats.gain - this.stats.montantEmprunt)-this.stats.coutCharge)] }
       ]
    };
  
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: 'STORE IT UP STAT',
        },
      },
    };
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

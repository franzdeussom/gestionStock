import { Injectable } from '@angular/core';

interface Alert {
	type: string;
	message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
    ALERTS: Alert[] = [
    {
      type: 'success',
      message: 'Operation effectuer avec Succes !',
    },
    {
      type: 'info',
      message: '',
    } ,
    {
      type: 'danger',
      message: 'Erreur lors doperation',
    }
  ]
  constructor() { }
}

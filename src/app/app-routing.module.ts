import { DirectorListempruntComponent } from './simpleUserPage/director-listemprunt/director-listemprunt.component';
import { AdminRapportStockComponent } from './simpleUserPage/admin-rapport-stock/admin-rapport-stock.component';
import { DirectorPerteComponent } from './simpleUserPage/director-perte/director-perte.component';
import { DirectorSanctionComponent } from './simpleUserPage/director-sanction/director-sanction.component';
import { StockAnalyseComponent } from './simpleUserPage/stock-analyse/stock-analyse.component';
import { MagazinierDasboardComponent } from './simpleUserPage/magazinier-dasboard/magazinier-dasboard.component';
import { DirectorStockComponent } from './simpleUserPage/director-stock/director-stock.component';
import { CashierCreateCommandComponent } from './simpleUserPage/cashier-create-command/cashier-create-command.component';
import { CashierResumeComponent } from './simpleUserPage/cashier-resume/cashier-resume.component';
import { AdminRapportPresenceComponent } from './simpleUserPage/admin-rapport-presence/admin-rapport-presence.component';
import { AdminRapportVenteComponent } from './simpleUserPage/admin-rapport-vente/admin-rapport-vente.component';
import { DirectorRapportComponent } from './simpleUserPage/director-rapport/director-rapport.component';
import { StockComponent } from './simpleUserPage/stock/stock.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeComponent } from './simpleUserPage/commande/commande.component';
import { DashboardComponent } from './simpleUserPage/dashboard/dashboard.component';
import { EmployesComponent } from './simpleUserPage/employes/employes.component';
import { FichePresenceComponent } from './simpleUserPage/fiche-presence/fiche-presence.component';
import { DemandeCongeComponent } from './simpleUserPage/demande-conge/demande-conge.component';
import { AdminRapportCommandeComponent } from './simpleUserPage/admin-rapport-commande/admin-rapport-commande.component';
import { DevelopperComponent } from './simpleUserPage/developper/developper.component';
import { AdminStatsComponent } from './simpleUserPage/admin-stats/admin-stats.component';


const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  }, 
  //stockeeper routes******
  {
    path:'magazinier/dashboard',
    component: MagazinierDasboardComponent
  },
  {
    path: 'gestion/stock',
    component: StockComponent
  },
  {
    path: 'gestion/commandes',
    component: CommandeComponent
  },
  {
    path: 'stock/analyse',
    component: StockAnalyseComponent
  },

  //admin routes*****
  {
    path: 'admin/employes',
    component: EmployesComponent
  },
  {
    path: 'admin/rapport/ventes',
    component: AdminRapportVenteComponent
  },
  {
    path: 'admin/rapport/stock',
    component: AdminRapportStockComponent
  },
  {
    path: 'admin/rapport/presence',
    component: AdminRapportPresenceComponent
  },
  {
    path: 'admin/rapport/stats',
    component: AdminStatsComponent
  },

  //cashier routes****
  {
    path: 'cashier/etablir-commande',
    component: CashierCreateCommandComponent
  },
  {
    path: 'cashier/resume',
    component: CashierResumeComponent
  },

  //director Routes ***
  {
      path: 'home/dashboard',
      component: DashboardComponent
  },
  {
    path: 'director/holiday-request',
    component: DemandeCongeComponent,
  },
  {
    path: 'director/present-list',
    component: FichePresenceComponent,
  },
  {
    path: 'director/employee-list',
    component: EmployesComponent
  },
  {
    path: 'director/rapport',
    component: DirectorRapportComponent
  },
  {
    path: 'director/sanction',
    component: DirectorSanctionComponent
  },
  {
    path: 'director/list-emprunts',
    component: DirectorListempruntComponent
  },

  {
    path: 'director/charge',
    component: DirectorPerteComponent
  },

  {
    path: 'director/stock',
    component: DirectorStockComponent
  },

  //developpers
  {
      path: 'developper/setting',
      component: DevelopperComponent
  },
  
  {
    path:'**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

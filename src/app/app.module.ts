import { TypeofPipe } from './../services/gestionEmployes/typeof.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideBarMenuComponent } from './side-bar-menu/side-bar-menu.component';
import { NavBarMenuComponent } from './nav-bar-menu/nav-bar-menu.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { StockComponent } from './simpleUserPage/stock/stock.component';
import { CommandeComponent } from './simpleUserPage/commande/commande.component';
import { EmployesComponent } from './simpleUserPage/employes/employes.component';
import { DashboardComponent } from './simpleUserPage/dashboard/dashboard.component';
import { FichePresenceComponent } from './simpleUserPage/fiche-presence/fiche-presence.component';
import { DemandeCongeComponent } from './simpleUserPage/demande-conge/demande-conge.component';
import { DirectorRapportComponent } from './simpleUserPage/director-rapport/director-rapport.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRapportVenteComponent } from './simpleUserPage/admin-rapport-vente/admin-rapport-vente.component';
import { AdminRapportCommandeComponent } from './simpleUserPage/admin-rapport-commande/admin-rapport-commande.component';
import { AdminRapportPresenceComponent } from './simpleUserPage/admin-rapport-presence/admin-rapport-presence.component';
import { AdminRapportStockComponent } from './simpleUserPage/admin-rapport-stock/admin-rapport-stock.component';
import { CashierCreateCommandComponent } from './simpleUserPage/cashier-create-command/cashier-create-command.component';
import { CashierResumeComponent } from './simpleUserPage/cashier-resume/cashier-resume.component';
import { DevelopperComponent } from './simpleUserPage/developper/developper.component';
import { DirectorStockComponent } from './simpleUserPage/director-stock/director-stock.component';
import { MagazinierDasboardComponent } from './simpleUserPage/magazinier-dasboard/magazinier-dasboard.component';
import { StockAnalyseComponent } from './simpleUserPage/stock-analyse/stock-analyse.component';
import { DirectorSanctionComponent } from './simpleUserPage/director-sanction/director-sanction.component';
import { DirectorPerteComponent } from './simpleUserPage/director-perte/director-perte.component';
import { AdminStatsComponent } from './simpleUserPage/admin-stats/admin-stats.component';
import { DirectorListempruntComponent } from './simpleUserPage/director-listemprunt/director-listemprunt.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    SideBarMenuComponent,
    NavBarMenuComponent,
    LoginComponent,
    StockComponent,
    CommandeComponent,
    EmployesComponent,
    DashboardComponent,
    FichePresenceComponent,
    DemandeCongeComponent,
    DirectorRapportComponent,
    AdminRapportVenteComponent,
    AdminRapportCommandeComponent,
    AdminRapportPresenceComponent,
    AdminRapportStockComponent,
    CashierCreateCommandComponent,
    CashierResumeComponent,
    DevelopperComponent,
    TypeofPipe,
    DirectorStockComponent,
    MagazinierDasboardComponent,
    StockAnalyseComponent,
    DirectorSanctionComponent,
    DirectorPerteComponent,
    AdminStatsComponent,
    DirectorListempruntComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

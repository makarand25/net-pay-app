import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NetpaydetailsComponent } from './netpaydetails/netpaydetails.component';
import { HealthcheckComponent } from './healthcheck/healthcheck.component';
import { HomeComponent } from './home/home.component';
import { NetPayApiService } from './services/netpayapi-service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: "healthcheck", component:HealthcheckComponent},
  {path: "netpaydetails", component: NetpaydetailsComponent},
  
];
@NgModule({
  declarations: [
    AppComponent,
    NetpaydetailsComponent,
    HealthcheckComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [AppComponent,
              NetPayApiService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }

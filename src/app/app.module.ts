import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NetpaydetailsComponent } from './netpaydetails/netpaydetails.component';

const appRoutes: Routes = [
  {path: "netpaydetails", component: NetpaydetailsComponent},
  
];
@NgModule({
  declarations: [
    AppComponent,
    NetpaydetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

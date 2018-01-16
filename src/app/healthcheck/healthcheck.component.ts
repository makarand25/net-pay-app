import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs';
import 'rxjs/add/operator/catch';

import { NetPayApiService } from '../services/netpayapi-service';

@Component({
  selector: 'app-healthcheck',
  templateUrl: './healthcheck.component.html',
  styleUrls: ['./healthcheck.component.css']
})
export class HealthcheckComponent implements OnInit {
  @ViewChild('frm') form: NgForm;

  private apiBaseURL ='https://api.acptfanniemae.com/';
  private apiSecretURL='https://api.acptfanniemae.com/cdxapi/client-secret/createsecret';
  
  data: Response;

  private clientId: string;
  private clientSecret: string; 
  private clientIdGenerated: boolean = false;
  private accessToken: string;
  private refreshToken: string;
  private apiKey: string;
  private health: string;

  private submitted: boolean = false;
  private enableAccessToken: boolean = false;
  private enableApiKey: boolean = false;
  private enableHealth: boolean = false;

  constructor(private http: Http, private netpaySvc: NetPayApiService,
              private route: Router){

  }

  ngOnInit(){
  }

  generateSecret(){
    console.log("inside generateSecret");
    this.netpaySvc.generateSecret().subscribe(
      (res: Response) => {
        this.clientId=res.json().responseEntity.clientId;
        this.clientSecret = res.json().responseEntity.clientSecret;
        this.enableAccessToken=true;
      },
      (err) => {
        this.clientId=err.statusText; 
      }
    );
  }

  generateAccessToken(){
    console.log("inside generateAccessToken()");
    this.netpaySvc.generateAccessToken().subscribe(
      (res: Response) => {
        this.accessToken = res.json().responseEntity.token;
        this.refreshToken = res.json().responseEntity.refreshToken;
        this.enableApiKey = true;
      }
    )

  }

  generateApiKey(){
    console.log("inside generateApiKey()");
    this.netpaySvc.generateApiKey().subscribe(
      (res: Response) => {
        this.apiKey = res.json().responseEntity.apiKey;
        this.enableHealth=true;
      }
    )
  }


  checkHealth(){
    this.netpaySvc.checkHealth().subscribe(
      (res: Response) => {
        this.health = res.text();
      }
    )
  }

  onSubmit(){
    this.submitted=true;
    console.log(this.form);
    this.netpaySvc.setUserIdAndPassword(this.form.value.userId, this.form.value.password);
    this.netpaySvc.setEnvironment(this.form.value.netpayEnvironment);

    this.form.controls.netpayEnvironment.disable();
    this.form.controls.userId.disable();
    this.form.controls.password.disable();

    
  }

  reset(){
    this.form.controls.netpayEnvironment.enable();
    this.form.controls.userId.enable();
    this.form.controls.password.enable();

  }

  goToPost(){
    this.route.navigate['netpaydetails'];
  }

  generate(){
    
  }
  
}

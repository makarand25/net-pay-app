import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs';

import { NetPayApiService } from '../services/netpayapi-service';

@Component({
  selector: 'app-healthcheck',
  templateUrl: './healthcheck.component.html',
  styleUrls: ['./healthcheck.component.css']
})
export class HealthcheckComponent implements OnInit {

  private apiBaseURL ='https://api.acptfanniemae.com/';
  private apiSecretURL='https://api.acptfanniemae.com/cdxapi/client-secret/createsecret';
  private corsUrl = 'http://cors-anywhere.herokuapp.com/';
  data: Response;

  private clientId: string;
  private clientSecret: string;
  private clientIdGenerated: boolean = false;
  private accessToken: string;
  private refreshToken: string;
  private apiKey: string;
  private health: string;

  constructor(private http: Http, private netpaySvc: NetPayApiService){

  }

  ngOnInit(){
  }

  generateSecret(){
    console.log("inside generateSecret");
    this.netpaySvc.generateSecret().subscribe(
      (res: Response) => {
        this.clientId=res.json().responseEntity.clientId;
        this.clientSecret = res.json().responseEntity.clientSecret;
      }
    );
  }

  generateAccessToken(){
    console.log("inside generateAccessToken()");
    this.netpaySvc.generateAccessToken().subscribe(
      (res: Response) => {
        this.accessToken = res.json().responseEntity.token;
        this.refreshToken = res.json().responseEntity.refreshToken;
      }
    )

  }

  generateApiKey(){
    console.log("inside generateApiKey()");
    this.netpaySvc.generateApiKey().subscribe(
      (res: Response) => {
        this.apiKey = res.json().responseEntity.apiKey;
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

}

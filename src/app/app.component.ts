import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs';

import { NetPayApiService } from './services/netpayapi-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NetPayApiService]
})
export class AppComponent implements OnInit {
  title = 'app';

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
    
    /*setTimeout(() => {
      if(this.clientId !== null){
        this.generateAccessToken();
      }
    }, 2000);
    
    setTimeout(() => {
      if(this.accessToken !== null){
        this.getApiKey();
      }
    }, 3000);*/

  }

  ngOnInit(){
      //this.generateSecret();
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

  private extractData(res: Response) {
    let body = res.json();
    //this.data = body;
  }

  checkHealth(){
    this.netpaySvc.checkHealth().subscribe(
      (res: Response) => {
        this.health = res.text();
      }
    )
  }
}

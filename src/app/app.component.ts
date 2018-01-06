import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

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
  private accessToken: string='d96459ed-0735-4dae-a360-7200793e604d';
  private apiKey: string;

  constructor(private http: Http){
    
    setTimeout(() => {
      if(this.clientId !== null){
        this.generateAccessToken();
      }
    }, 2000);
    
  }

  ngOnInit(){
      this.generateSecret();
  }

  generateSecret(){
    let headers = new Headers();
    headers.append('Authorization', 'Basic '+btoa('w5001q1a:Asfau@16'));
    headers.append('Content-Type', 'application/json');
    headers.append('x-fnma-channel', 'api');
    headers.append('x-fnma-sub-channel', 'netpay');

    let opts = new RequestOptions();
    opts.headers = headers;
    
    let url = 'http://localhost:1337/api.acptfanniemae.com/cdxapi/client-secret/createsecret'

    this.http.post(url ,'',
       opts).subscribe(
        (res: Response) => { //this.data = res.json();
              // console.log(this.data)
              this.extractData(res); 
              this.clientId=res.json().responseEntity.clientId;
              this.clientSecret = res.json().responseEntity.clientSecret
              console.log('Got client id: ' + this.clientId);
            },
      msg => console.error('Error: ${msg.status} ${msg.statusText}') 
    );
    
  }

  generateAccessToken(){
    let headers = new Headers();
    headers.append('Authorization', 'Basic '+btoa('w5001q1a:Asfau@16'));
    headers.append('Content-Type', 'application/json');
    headers.append('x-fnma-channel', 'api');
    //headers.append('x-fnma-sub-channel', 'netpay');
    headers.append('x-fnma-client-id', this.clientId);
    headers.append('x-fnma-client-secret', this.clientSecret);

    let opts = new RequestOptions();
    opts.headers = headers;
    
    let url = 'http://localhost:1337/api.acptfanniemae.com/cdx-api/accesstoken';

    this.http.post(url, '',
       opts).subscribe(
        (res: Response) => { //this.data = res.json();
              console.log(res.json())
              this.extractData(res); 
              this.accessToken=res.json().responseEntity.accessToken;
              
            },
      msg => console.error('Error: ${msg.status} ${msg.statusText}') 
    );

  }

  getApiKey(){
    let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');
    
    headers.append('x-fnma-channel', 'api');
    headers.append('x-fnma-clientId', this.clientId);
    headers.append('x-fnma-access-token', this.accessToken);
    
    
    let opts = new RequestOptions();
    opts.headers = headers;
    
    let url = 'http://localhost:1337/api.acptfanniemae.com:443/cdx-api/client-secret/getapikey';
    
    this.http.post(url, '',
       opts).subscribe(
        (res: Response) => { //this.data = res.json();
              console.log(res.json())
              this.extractData(res); 
              this.apiKey=res.json().responseEntity.apiKey;
              
            },
      msg => console.error('Error: ${msg.status} ${msg.statusText}') 
    );

  }

  private extractData(res: Response) {
    let body = res.json();
    //this.data = body;
  }
}

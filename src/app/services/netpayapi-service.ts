import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class NetPayApiService {

 private apiBaseURL ='https://api.acptfanniemae.com/';
  private apiSecretURL='https://api.acptfanniemae.com/cdxapi/client-secret/createsecret';
  private corsUrl = 'http://cors-anywhere.herokuapp.com/';
  data: Response;

  private clientId: string;
  private clientSecret: string;
  private clientIdGenerated: boolean = false;
  private accessToken: string;
  private apiKey: string;

  constructor(private http: Http){
    
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
    let headers = new Headers();
    headers.append('Authorization', 'Basic '+btoa('w5001q1a:Asfau@16'));
    headers.append('Content-Type', 'application/json');
    headers.append('x-fnma-channel', 'api');
    headers.append('x-fnma-sub-channel', 'netpay');

    let opts = new RequestOptions();
    opts.headers = headers;
    
    let url = 'http://localhost:1337/api.acptfanniemae.com/cdxapi/client-secret/createsecret'

    return this.http.post(url ,'',
       opts).map(
        (res: Response) => { //this.data = res.json();
              // console.log(this.data)
              //this.extractData(res); 
              this.clientId=res.json().responseEntity.clientId;
              this.clientSecret = res.json().responseEntity.clientSecret
              //console.log('Got client id: ' + this.clientId);
              //this.clientIdGenerated=true;
              return res;
            },
      msg => console.error('Error: ${msg.status} ${msg.statusText}') 
    );
    
  }

  generateAccessToken(){
    let headers = new Headers();
    headers.append('Authorization', 'Basic '+btoa('<username>:<pwd>'));
    headers.append('Content-Type', 'application/json');
    headers.append('x-fnma-channel', 'api');
    //headers.append('x-fnma-sub-channel', 'netpay');
    headers.append('x-fnma-client-id', this.clientId);
    headers.append('x-fnma-client-secret', this.clientSecret);

    let opts = new RequestOptions();
    opts.headers = headers;
    
    let url = 'http://localhost:1337/api.acptfanniemae.com/cdxapi/accesstoken';

    return this.http.post(url, '',
       opts).map(
        (res: Response) => { //this.data = res.json();
              console.log(res.json())
              //this.extractData(res); 
              this.accessToken=res.json().responseEntity.token;
              return res;
            },
      msg => console.error('Error: ${msg.status} ${msg.statusText}') 
    );

  }

  generateApiKey(){
    let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');
    
    headers.append('x-fnma-channel', 'api');
    headers.append('x-fnma-clientId', this.clientId);
    headers.append('x-fnma-access-token', this.accessToken);
    
    
    let opts = new RequestOptions();
    opts.headers = headers;
    
    let url = 'http://localhost:1337/api.acptfanniemae.com/cdxapi/client-secret/getapikey';
    
    return this.http.post(url, '',
       opts).map(
        (res: Response) => { //this.data = res.json();
              console.log(res.json())
              //this.extractData(res); 
              this.apiKey=res.json().responseEntity.apiKey;
              return res;
            },
      msg => console.error('Error: ${msg.status} ${msg.statusText}') 
    );

  }

  checkHealth(){

    let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');
    
    headers.append('x-fnma-channel', 'api');
    headers.append('x-fnma-api-key', this.apiKey);
    headers.append('x-fnma-access-token', this.accessToken);
    
    
    let opts = new RequestOptions();
    opts.headers = headers;
    
    let url = 'http://localhost:1337/api.acptfanniemae.com/netpay/originations/borrowers/v1/netpay/health';
    
    return this.http.get(url, 
       opts).map(
        (res: Response) => { //this.data = res.json();
              console.log(res.text());
              //this.extractData(res); 
              
              return res;
            },
      msg => console.error('Error: ${msg.status} ${msg.statusText}') 
    );
  }

  private extractData(res: Response) {
    let body = res.json();
    //this.data = body;
  }

}
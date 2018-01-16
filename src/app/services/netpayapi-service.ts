import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
@Injectable()
export class NetPayApiService {

  private apiBaseURL ='api.acptfanniemae.com';
  private proxyURL = 'http://localhost:1337';
  data: Response;

  private userId: string;
  private password: string;
  private clientId: string;
  private clientSecret: string;
  private clientIdGenerated: boolean = false;
  private accessToken: string;
  private apiKey: string;
  private netpayEnv: string;

  constructor(private http: Http){
  }

  ngOnInit(){
  }

  setUserIdAndPassword(userId: string, password: string){
    this.userId=userId;
    this.password=password;
  }

  setEnvironment(env: string){
    this.netpayEnv = env;
  }

  generateSecret(){
    console.log("inside generateSecret");
    let headers = new Headers();
    headers.append('Authorization', 'Basic '+btoa(this.userId+':'+this.password));
    headers.append('Content-Type', 'application/json');
    headers.append('x-fnma-channel', 'api');
    headers.append('x-fnma-sub-channel', 'netpay');

    let opts = new RequestOptions();
    opts.headers = headers;

    // let url = 'http://localhost:1337/api.acptfanniemae.com/cdxapi/client-secret/createsecret'
    let url = this.proxyURL+'/'+this.apiBaseURL+'/cdxapi/client-secret/createsecret';

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
      msg => {
        console.error('Error: ${msg.status} ${msg.statusText}')
        return msg;
      }  
    ).catch(
      (err) => {
        
       return err;
    });
    
  }

  generateAccessToken(){
    let headers = new Headers();
    
    headers.append('Authorization', 'Basic '+btoa(this.userId+':'+this.password));
    headers.append('Content-Type', 'application/json');
    headers.append('x-fnma-channel', 'api');
    headers.append('x-fnma-client-id', this.clientId);
    headers.append('x-fnma-client-secret', this.clientSecret);

    let opts = new RequestOptions();
    opts.headers = headers;
    
    let url = this.proxyURL+'/'+this.apiBaseURL+'/cdxapi/accesstoken';

    return this.http.post(url, '',
       opts).map(
        (res: Response) => { 
              console.log(res.json())
              this.accessToken=res.json().responseEntity.token;
              return res;
            },
      (res: Response) => {console.error('Error:'+ res.json().statusText)}
    )
    

  }

  generateApiKey(){
    let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');   
    headers.append('x-fnma-channel', 'api');
    headers.append('x-fnma-clientId', this.clientId);
    headers.append('x-fnma-access-token', this.accessToken);
       
    let opts = new RequestOptions();
    opts.headers = headers;
       
    let url = this.proxyURL+'/'+this.apiBaseURL+'/cdxapi/client-secret/getapikey';

    return this.http.post(url, '',
       opts).map(
        (res: Response) => { 
              console.log(res.json())
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
    
    let url = this.proxyURL+'/'+this.apiBaseURL+'/'+this.netpayEnv+'/originations/borrowers/v1/netpay/health';

    return this.http.get(url, 
       opts).map(
        (res: Response) => { 
              console.log(res.text()); 
              return res;
            }

    ).catch(
      (err) => {
       return err.statusText;
    })
      
  }

  private extractData(res: Response) {
    let body = res.json();
  }

  public generate(){
    let headers = new Headers();
    headers.append('Authorization', 'Basic '+btoa(this.userId+':'+this.password));
    headers.append('Content-Type', 'application/json');
    headers.append('x-fnma-channel', 'api');
    headers.append('x-fnma-sub-channel', 'netpay');

    let opts = new RequestOptions();
    opts.headers = headers;

    // let url = 'http://localhost:1337/api.acptfanniemae.com/cdxapi/client-secret/createsecret'
    let url = this.proxyURL+'/'+this.apiBaseURL+'/cdxapi/client-secret/createsecret';

    return this.http.post(url ,'',
       opts).map(
        (res: Response) => { 
              this.clientId=res.json().responseEntity.clientId;
              this.clientSecret = res.json().responseEntity.clientSecret
            
              // return res;
            },
      msg => {
        console.error('Error: ${msg.status} ${msg.statusText}')
        return msg;
      }  
    ).flatMap(
      (data : any) => {

        let headers = new Headers();
    
        headers.append('Authorization', 'Basic '+btoa(this.userId+':'+this.password));
        headers.append('Content-Type', 'application/json');
        headers.append('x-fnma-channel', 'api');
        headers.append('x-fnma-client-id', this.clientId);
        headers.append('x-fnma-client-secret', this.clientSecret);

        let opts = new RequestOptions();
        opts.headers = headers;
        
        let url = this.proxyURL+'/'+this.apiBaseURL+'/cdxapi/accesstoken';
        return this.http.post(url, '',
          opts).map(
            (res: Response) => { 
                  console.log(res.json())
                  this.accessToken=res.json().responseEntity.token;
                  
                },
          (res: Response) => {console.error('Error:'+ res.json().statusText)}
        )
      }
    
    );
    
  }

}
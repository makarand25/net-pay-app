import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

export class NetPayApiService {

    private baseUrl = 'https://api.acptfanniemae/com/';
    private response : any;
    
    

    generateSecret(){
    /*let headers = new Headers();
    headers.append('Authorization', 'Basic '+btoa('w5001q1a:Asfau@16'));
    headers.append('Content-Type', 'application/json');
    headers.append('x-fnma-channel', 'api');
    headers.append('x-fnma-sub-channel', 'netpay');
 
    let opts = new RequestOptions();
    opts.headers = headers;
    let url = '${this.baseUrl}/cdxapi/client-secret/createsecret';
    this.http.post(url, '',
       opts).map(
      res =>  this.response=(res.json()),
      msg => console.error('Error: ${msg.status} ${msg.statusText}') 
    );
    */
  }

}
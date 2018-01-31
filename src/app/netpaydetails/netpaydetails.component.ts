import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs';
import 'rxjs/add/operator/catch';

import { NetPayApiService } from '../services/netpayapi-service';

@Component({
  selector: 'app-netpaydetails',
  templateUrl: './netpaydetails.component.html',
  styleUrls: ['./netpaydetails.component.css']
})
export class NetpaydetailsComponent implements OnInit {
  @ViewChild('frm') form: NgForm;

  data: string;

  constructor(private netpaySvc: NetPayApiService,
              private http: Http) { }

  ngOnInit() {
  }

  onSubmit(){

    this.data = this.form.value.assetData;
    console.log(this.data);
    this.netpaySvc.calculateNetPay(this.data).subscribe(
      res => console.log(res),
      err => console.log(err._body),
      );

  }

  opened: Boolean = false;
  openedQuestionList: Boolean = false;
  openedUpdateNetPay: Boolean = false;
    
    toggle (operation: string) {
      console.log("Inside TOGGLE!");
      if( operation === 'calculateNetPay') {
        this.opened = !this.opened;
        this.openedQuestionList = false;
        this.openedUpdateNetPay = false;
      }else if (operation === 'questionList'){
        this.openedQuestionList = !this.openedQuestionList;
        this.opened = false;
        this.openedUpdateNetPay = false;
      }else if ( operation === 'updateNetPay'){
        this.openedUpdateNetPay = !this.openedUpdateNetPay;
        this.opened = false;
        this.openedQuestionList = false;
      }
      

    }

}

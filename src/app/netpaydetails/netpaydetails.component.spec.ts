import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetpaydetailsComponent } from './netpaydetails.component';

describe('NetpaydetailsComponent', () => {
  let component: NetpaydetailsComponent;
  let fixture: ComponentFixture<NetpaydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetpaydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetpaydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

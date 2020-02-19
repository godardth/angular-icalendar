import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularIcalendarComponent } from './angular-icalendar.component';

describe('AngularIcalendarComponent', () => {
  let component: AngularIcalendarComponent;
  let fixture: ComponentFixture<AngularIcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularIcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularIcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

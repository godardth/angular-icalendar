import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularIcalendarComponent } from './angular-icalendar.component';
import { AngularIcalendarService } from './angular-icalendar.service';



@NgModule({
  declarations: [
    AngularIcalendarComponent
  ],
  imports: [
    HttpClientModule
  ],
  providers: [
    AngularIcalendarService
  ],
  exports: [
    AngularIcalendarComponent
  ]
})
export class AngularIcalendarModule { }

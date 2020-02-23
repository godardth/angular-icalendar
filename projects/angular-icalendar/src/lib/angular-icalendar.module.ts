import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularIcalendarService } from './angular-icalendar.service';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    AngularIcalendarService
  ],
  exports: []
})
export class AngularIcalendarModule { }

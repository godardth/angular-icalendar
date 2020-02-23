import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IcsParserService } from './angular-icalendar.service';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    IcsParserService
  ],
  exports: []
})
export class AngularIcalendarModule { }

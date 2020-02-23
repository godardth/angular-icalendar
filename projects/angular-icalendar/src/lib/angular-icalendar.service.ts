import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendar } from './models';


@Injectable()
export class AngularIcalendarService {

  parseICS(ics: string): Calendar {
    return new Calendar(ics);
  }

}

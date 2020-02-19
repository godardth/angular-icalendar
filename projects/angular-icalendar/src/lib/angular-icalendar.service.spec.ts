import { TestBed } from '@angular/core/testing';

import { AngularIcalendarService } from './angular-icalendar.service';

describe('AngularIcalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularIcalendarService = TestBed.get(AngularIcalendarService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { IcsParserService } from './angular-icalendar.service';

describe('IcsParserService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [IcsParserService]
  }));

  it('should be created', () => {
    const service: IcsParserService = TestBed.get(IcsParserService);
    expect(service).toBeTruthy();
  });

});

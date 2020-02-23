[![Build Status](https://travis-ci.com/godardth/angular-icalendar.svg?branch=master)](https://travis-ci.com/godardth/angular-icalendar)

# angular-icalendar

Parser for iCalendar written for Angular. This package is under development and should not be used in production.

## Dependencies

- Angular (Tested with Angular v7)
- moment (Tested with Moment v2.24.0)

## Installation

Run `npm install angular-icalendar` to install.

## Usage

In your xxx.module.ts file :
```
import { AngularIcalendarModule } from 'angular-icalendar';
...
@NgModule({
  imports: [
    ...,
    AngularIcalendarModule,
    ...
  ],
```

In your xxx.component.ts file :
```
import { IcsParserService } from 'angular-icalendar';
...
export class CalendarsComponent implements OnInit {

  constructor(
    private icsParser: IcsParserService
  ) {}

  sampleFunction(): void {
    let parsedCal = this.icsParser.parseICS(ics_string);
  }
```

## Contributing

Feel free to create pull request.

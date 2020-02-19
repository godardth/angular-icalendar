import * as moment_ from 'moment';
const moment = moment_;

abstract class CalendarObject {

  abstract setProperty(property: string, value: any);
  abstract addChildren(cls: string, object: any);

  selfParse(icsString: string) {
    var firstLine = true;
    var subObject = false;
    var childObjectClass = '';
    var childIcsString = '';

    icsString = icsString.replace(/\n /g, "");

    for( let line of icsString.split('\n') ) {

      // Current Line
      let sepIndex = line.indexOf(":");
      let property = line.substring(0, sepIndex);
      var value = line.substring(sepIndex+1, line.length);
      if ( value ) value = value.slice(0, -1);
      childIcsString += line + '\n';

      // Child Object Parsing
      if ( (property == 'END') && (value == childObjectClass) ) {
        subObject = false;
        switch(childObjectClass) {
          case 'VEVENT':
            this.addChildren('VEVENT', new Event(childIcsString));
            break;
          case 'VALARM':
            this.addChildren('VALARM', new Alarm(childIcsString));
            break;
          case 'VTIMEZONE':
            this.addChildren('VTIMEZONE', new Timezones(childIcsString));
            break;
          case 'STANDARD':
            this.addChildren('STANDARD', new Timezone(childIcsString));
            break;
          case 'DAYLIGHT':
            this.addChildren('DAYLIGHT', new Timezone(childIcsString));
            break;
        }
      }
      if ( ( property == 'BEGIN' ) && ( !firstLine ) && ( !subObject ) ) {
        childObjectClass = value;
        childIcsString = '';
        subObject = true;
      }

      // Set the properties of current object
      else {
        this.setProperty(property, value);
      }

      // First Line
      if ( firstLine ) {
        let currentObjectClass = value;
        firstLine = false;
      }

    }
  }

}

abstract class EventTodoJournalComponent extends CalendarObject {
  attach: Array<any>;
  attendee: Array<any>;
  categories: Array<any>;
  class: string;
  comment: Array<any>;
  contact: Array<any>;
  created: any;
  description: string;
  dtstamp: any;
  dtstart: any;
  exdate: any;
  exrule: any;
  lastmod: any;
  organizer: any;
  rdate: any;
  recurid: number;
  related: Array<any>;
  rrule: Array<any>;
  rstatus: Array<any>;
  seq: any;
  status: any;
  summary: any;
  uld: any;
  url: any;
  xprop: any;

  setProperty(property: string, value: any) {
    switch (property) {
      case 'DTSTAMP':
        this.dtstamp = moment(value);
        break;
      case 'LAST-MODIFIED':
        this.lastmod = moment(value);
        break;
      case 'DTSTART':
        this.dtstart = moment(value);
        break;
      case 'CREATED':
        this.created = moment(value);
        break;
      case 'DESCRIPTION':
        this.description = value;
        break;
      case 'SUMMARY':
        this.summary = value;
        break;
      case 'RRULE':
        this.rrule = value;
        break;
    }
  }

}

export class Alarm extends CalendarObject {
  action: string;
  attach: string;
  attendee: Array<any>;
  description: string;
  summary: string;
  trigger: string;

  constructor(icsString: string) {
    super();
    this.attendee = new Array();
    this.selfParse(icsString);
  }

  setProperty(property: string, value: any) {
    switch (property) {
      case 'ACTION':
        this.action = value;
        break;
      case 'DESCRIPTION':
        this.description = value;
        break;
      case 'TRIGGER':
        this.trigger = value;
        break;
    }
  }

  addChildren(cls: string, object: any) {}

}

export class Event extends EventTodoJournalComponent {
  dtend: any;
  duration: any;
  geo: any;
  location: any;
  priority: any;
  resources: Array<any>;
  transp: any;
  alarm: Array<any>;

  constructor(icsString: string) {
    super();
    this.resources = new Array();
    this.alarm = new Array();
    this.selfParse(icsString);
  }

  setProperty(property: string, value: any) {
    super.setProperty(property, value);
    switch (property) {
      case 'PRIORITY':
        this.priority = value;
        break;
      case 'DTEND':
        this.dtend = moment(value);
        break;
    }
  }

  addChildren(cls: string, object: any) {
    switch (cls) {
      case 'VALARM':
        this.alarm.push(object);
        break;
    }
  }

}

export class Timezone extends CalendarObject {
  dtstart: any;
  tzname: string;
  tzoffsetfrom: any;
  tzoffsetto: any;

  constructor(icsString: string) {
    super();
    this.selfParse(icsString);
  }

  setProperty(property: string, value: any) {
    switch (property) {
      case 'TZNAME':
        this.tzname = value;
        break;
      case 'TZOFFSETFROM':
        this.tzoffsetfrom = value;
        break;
      case 'TZOFFSETTO':
        this.tzoffsetto = value;
        break;
    }
  }

  addChildren(cls: string, object: any) {}

}

export class Timezones extends CalendarObject {
  lastmod: any;
  tzid: any;
  tzurl: any;
  standard: Timezone;
  daylight: Timezone;

  constructor(icsString: string) {
    super();
    this.selfParse(icsString);
  }

  setProperty(property: string, value: any) {
    switch (property) {
      case 'TZID':
        this.tzid = value;
        break;
    }
  }

  addChildren(cls: string, object: any) {
    switch (cls) {
      case 'STANDARD':
        this.standard = object;
        break;
      case 'DAYLIGHT':
        this.daylight = object;
        break;
    }
  }

}

export class Calendar extends CalendarObject{
    calscale: string;
    method: string;
    version: string;
    xprop: string;
    prodid: string;
    events: Array<Event>;
    timezones: Array<Timezones>;

    constructor(icsString: string) {
      super();
      this.events = [];
      this.timezones = [];
      this.selfParse(icsString);
    }

    setProperty(property: string, value: any) {
      switch (property) {
        case 'PRODID':
          this.prodid = value;
          break;
        case 'VERSION':
          this.version = value;
          break;
        case 'CALSCALE':
          this.calscale = value;
          break;
      }
    }

    addChildren(cls: string, object: any) {
      switch (cls) {
        case 'VEVENT':
          this.events.push(object);
          break;
        case 'VTIMEZONE':
          this.timezones.push(object);
          break;
      }
    }

    getEvents(from: any, to: any): Array<Event> {
      var events = Array();
      for( let event of this.events ) {
        if ( ( event.dtend >= from ) && ( event.dtstart <= to ) ) {
          events.push(event);
        }
      }
      return events;
    }

}

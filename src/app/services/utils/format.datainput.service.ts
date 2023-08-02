import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class FormatDatainputService {

  constructor() { }

   formatInputDateToOutput(modelDate:NgbDateStruct):Date {
    let date:Date = new Date();
    date.setFullYear(modelDate.year);
    date.setMonth(modelDate.month - 1);
    date.setUTCDate(modelDate.day);
    return date;
   }
}

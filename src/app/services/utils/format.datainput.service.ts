import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class FormatDatainputService {

  constructor() { }

   formatInputDateToOutput(modelDate:NgbDateStruct):Date {
    console.log(modelDate);
    console.log(modelDate.day);
    let date:Date = new Date();
    date.setFullYear(modelDate.year);
    date.setMonth(modelDate.month - 1);
    date.setUTCDate(modelDate.day);
    console.log(modelDate);
    console.log(date);
    return date;
   }
}

import { Choice } from './../../pages/questionnaire/questionnaire_model';
/* eslint-disable @typescript-eslint/member-ordering */

import { Question } from './../../pages/questionnaire/questionnaire_model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;


  constructor() { }

  ngOnInit() {}

  radioGroupChange(event: any): void {
    if(event.detail.value){
      event.detail.value.selected = true;
    }

  }


}



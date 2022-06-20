import { Question, Questionnaire } from './questionnaire_model';
import { ApiService } from './../../service/api/api.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Gesture, GestureConfig, createGesture } from '@ionic/core';
import { GestureController } from '@ionic/angular';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.page.html',
  styleUrls: ['./questionnaire.page.scss'],
})
export class QuestionnairePage implements OnInit {

  @ViewChild('box', { read: ElementRef }) box: ElementRef;

  options: GestureConfig;
  questionnaire: Questionnaire;
  currentQuestionIndex = 0;


  constructor(public apiService: ApiService, private gestureCtrl: GestureController) { }


  async ngOnInit() {
    this.questionnaire = await this.apiService.load();
    console.log(this.questionnaire);

  }





  currentQuestion(index: number): Question {
    return this.questionnaire.questionnaire.questions[index];
  }

  nextQuestion() {
    let question = this.currentQuestion(this.currentQuestionIndex);
    if (question.jumps.length > 0) {
      const jumpTo = question.jumps.find(item => item.conditions.some(condition => condition.value === question.answer?.value)
      );
      if (jumpTo) {
        const previousId = question.identifier;
        this.currentQuestionIndex = this.findOutIndexFromQuestionIdentifier(jumpTo.destination.id);
        question = this.currentQuestion(this.currentQuestionIndex);
        question.previousQuestionIdentifier = previousId;
      }
    }
    else {
      this.currentQuestionIndex++;
    }
    console.log(this.currentQuestion(this.currentQuestionIndex));
  }
  previousQuestion() {
    const previousIdentifier = this.questionnaire.questionnaire.questions[this.currentQuestionIndex]?.previousQuestionIdentifier;
    if (previousIdentifier) {
      const previousIndex = this.findOutIndexFromQuestionIdentifier(previousIdentifier);
      this.currentQuestionIndex = previousIndex;
    }
    else {
      this.currentQuestionIndex--;
    }
  }

  hasNextQuestion(): boolean {
    return this.currentQuestionIndex + 1 < this.questionnaire?.questionnaire?.questions.length && this.isCurrentQuestionAnswered();
  }
  hasPreviousQuestion(): boolean {
    return this.currentQuestionIndex - 1 >= 0;
  }

  findOutIndexFromQuestionIdentifier(identifier: string): number {
    for (let i = 0; i < this.questionnaire.questionnaire.questions.length; i++) {
      if (this.questionnaire.questionnaire.questions[i].identifier === identifier) {
        return i;
      }
    }
  }
  isCurrentQuestionAnswered() {
    const currentQuestion = this.currentQuestion(this.currentQuestionIndex);
    if (!currentQuestion.required) {
      return true;
    }
    else if (currentQuestion.answer || currentQuestion.choices.some(value => value.selected)) {
      return true;
    }
    return false;
  }






}

export interface Questionnaire {
  questionnaire: QuestionnaireClass;
}

export interface QuestionnaireClass {
  id:                     number;
  identifier:             string;
  name:                   string;
  questions:              Question[];
  description:            string;
  categoryNameHyphenated: string;
}

export interface Question {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  question_type: QuestionType;
  identifier:   string;
  headline:     string;
  description:  string;
  required:     boolean;
  multiple?:    string;
  choices?:     Choice[];
  jumps:        Jump[];
  multiline?:   string;
  answer?:      any;
  previousQuestionIdentifier?: string;
}

export interface Choice {
  label:    string;
  value:    string;
  selected: boolean;
}

export interface Jump {
  conditions:  Condition[];
  destination: Destination;
}

export interface Condition {
  field: string;
  value: string;
}

export interface Destination {
  id: string;
}

export enum QuestionType {
  multipleChoice = 'multiple-choice',
  text = 'text',
}

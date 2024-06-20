export type QuestionType = 'radio-button-group'

export type StepKey = 'question' | 'info'

export type Option = {
  id: string
  text: string
  nextStepId: string
}

type Branch = {
  [K in string]: {
    response: string
  }
}

type Expression = {
  regex: string
  relationId: string
  replacedText?: { [K in string]: string }
  capilalize?: boolean
}

type SurveyStep = {
  id: string
  key: StepKey
  hasBranches: boolean
}

export type QuestionStepProps = SurveyStep & {
  question: string
  type: QuestionType
  options: Option[]
  description?: string
  branches?: Branch
  expressions?: Expression[]
}

export type InfoStepProps = SurveyStep & {
  title: string
  description: string
  btnText: string
  nextStepId: string | string[]
}

export type QuestionInputProps<T extends QuestionType> = {
  data: T
  onClick: (key: string) => void
}

export interface QuestionInputPropsMap {
  'radio-button-group': {
    data: Option[]
    onNextStep: (result: string, nextStepId: string) => void
    value?: string
  }
}

export interface StepProps<T> {
  step: T
  onPrevStep: () => void
  onNextStep: (
    stepKey: StepKey,
    stepId: string,
    nextStepId: string | string[],
    hasBranches: boolean,
    result: string | null,
  ) => void
}

export interface StepsPropsMap {
  question: StepProps<QuestionStepProps>
  info: StepProps<InfoStepProps>
}

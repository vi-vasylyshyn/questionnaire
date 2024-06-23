import { HistoryItem } from '@/store/surveyHistorySlice'
import { QuestionStepProps } from '@/types/survey'

import { toCapitalize } from './toCapitalize'

export const formatQuestion = (
  step: QuestionStepProps,
  history: {
    [x: string]: HistoryItem
  },
  questionConfig: QuestionStepProps[],
): string => {
  if (!step.expressions?.length) return step.question
  let formattedText = step.question
  step.expressions.forEach(expression => {
    const regexp = new RegExp(expression.regex, 'g')
    const responseId = history[expression.relationId]?.response || ''
    const relatedQuestion = questionConfig.find(question => question.id === expression.relationId)

    const replacedText = expression.replacedText
      ? expression.replacedText[responseId]
      : relatedQuestion?.options.find(option => option.id === responseId)?.text || ''
    const transformedText = expression.capilalize ? toCapitalize(replacedText) : replacedText?.toLowerCase()
    formattedText = formattedText.replace(regexp, transformedText)
  })
  return formattedText
}

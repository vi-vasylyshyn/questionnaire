import type { HistoryItem } from '@/store/surveyHistorySlice'
import type { QuestionStepProps } from '@/types/survey'

export const buildResultsList = (
  questions: QuestionStepProps[],
  responses: {
    [x: string]: HistoryItem
  },
) => {
  const responsesKeys = Object.keys(responses)
  return questions
    .filter(question => responsesKeys.includes(question.id))
    .map(question => ({
      question,
      response: question.options.find(option => option.id === responses[question.id].response)?.text || '',
    }))
}

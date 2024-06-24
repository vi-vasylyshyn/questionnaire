import { History } from '@/store/surveyHistorySlice'
import { QuestionStepProps } from '@/types/survey'

type LastResponse = {
  step: string
  response?: string | null
} | null

export const getLastResponse = (step: string, history: History): LastResponse => {
  if (!!history[step].response) {
    return { step, response: history[step].response }
  }
  if (history[step].response === null && history[step].parentId) {
    return getLastResponse(history[step].parentId!, history)
  }
  return null
}

export function findNextStep(stepId: string, history: History, questionsConfig: QuestionStepProps[]) {
  const parentId = history[stepId].parentId

  const lastStepWithResponse = parentId && getLastResponse(parentId, history)
  const nextStep = questionsConfig.find(
    question =>
      !!lastStepWithResponse &&
      !!question.branches?.[lastStepWithResponse.step!] &&
      question.branches?.[lastStepWithResponse.step!].response === lastStepWithResponse?.response,
  )
  return nextStep?.id || null
}

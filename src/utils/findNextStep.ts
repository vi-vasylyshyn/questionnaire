import { HistoryItem } from '@/store/surveyHistorySlice'
import { QuestionStepProps } from '@/types/survey'

export function findNextStep(historyItem: [string, HistoryItem], steps: QuestionStepProps[]) {
  const branchId = historyItem[0]
  const response = historyItem[1].response
  const nextStep = steps.find(step => {
    if (!step.branches) return false
    return branchId in step.branches && response === step.branches[branchId].response
  })
  return nextStep?.id
}

import { useCallback, useMemo } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import InfoStep from '@/components/InfoStep'
import QuestionStep from '@/components/QuestionStep'
import { questionsConfig, surveySteps } from '@/constants/config'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  clearReverseHistory,
  getHistorySelector,
  getIsHistoryEmptySelector,
  getReverseHistorySelector,
  type History,
  removeHistoryItemsAfterBranching,
  removeReverseHistoryItem,
  setHistoryItem,
  setReverseHistoryItem,
} from '@/store/surveyHistorySlice'
import type { InfoStepProps, QuestionStepProps, StepKey } from '@/types/survey'
import { findNextStep } from '@/utils/findNextStep'
import { formatQuestion } from '@/utils/format/formatQuestion'

interface StepPageProps {
  step: QuestionStepProps | InfoStepProps
}

const isQuestionStep = (step: InfoStepProps | QuestionStepProps): step is QuestionStepProps => {
  return step.key === 'question'
}

const StepPage = ({ step }: StepPageProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const history = useAppSelector(getHistorySelector)
  const isHistoryEmpty = useAppSelector(getIsHistoryEmptySelector)
  const reverseHistory = useAppSelector(getReverseHistorySelector)

  const formattedQuestionStep = useMemo(() => {
    if (isQuestionStep(step)) {
      const formattedQuestion = formatQuestion(step, history, questionsConfig)
      return { ...step, question: formattedQuestion } as QuestionStepProps
    }
    return null
  }, [history, step])

  const shouldUpdateHistory = useCallback((stepId: string, nextResponse: string | null, history: History) => {
    const currentStep = history[stepId]
    return currentStep.hasBranches && nextResponse && currentStep.response !== nextResponse
  }, [])

  const handlePrevStep = useCallback(() => {
    dispatch(setReverseHistoryItem(step.id))
    const prevStep = history[step.id].parentId
    if (prevStep) {
      router.push(`/survey/${prevStep}`)
    }
  }, [dispatch, history, router, step.id])

  const handleNextStep = useCallback(
    (
      stepKey: StepKey,
      stepId: string,
      nextStepId: string | string[],
      hasBranches: boolean,
      response: string | null,
    ) => {
      let nextStep = nextStepId as string
      if (Array.isArray(nextStepId)) {
        nextStep = findNextStep(stepId, history, questionsConfig) || ''
      }

      if (!!reverseHistory.length && shouldUpdateHistory(step.id, response, history)) {
        dispatch(removeHistoryItemsAfterBranching())
        dispatch(clearReverseHistory())
      }

      if (!!reverseHistory.length && reverseHistory.includes(nextStep)) {
        dispatch(removeReverseHistoryItem(nextStep))
      }

      if (stepId) {
        dispatch(
          setHistoryItem({
            stepKey,
            stepId,
            hasBranches,
            parentId: !isHistoryEmpty ? stepId : null,
            response: response!,
          }),
        )
        dispatch(
          setHistoryItem({
            stepId: nextStep,
            parentId: stepId,
          }),
        )
      }

      if (nextStepId === 'results') {
        router.push({ pathname: '/results' })
        return
      }

      router.push({ pathname: `/survey/${nextStep}` })
    },
    [dispatch, history, isHistoryEmpty, reverseHistory, router, shouldUpdateHistory, step.id],
  )

  return (
    <div className="step">
      {isQuestionStep(step) ? (
        <QuestionStep step={formattedQuestionStep!} onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      ) : (
        <InfoStep step={step} onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      )}
    </div>
  )
}

export default StepPage

export const getStaticPaths: GetStaticPaths = async () => {
  const surveyStepsPaths = surveySteps.map(step => ({
    params: { id: step.id },
  }))
  return { paths: surveyStepsPaths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentStep = surveySteps.find(step => step.id === params?.id)
  return {
    props: {
      step: currentStep,
    },
  }
}

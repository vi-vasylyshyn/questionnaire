import React, { useCallback, useMemo } from 'react'

import { questionInputs } from '@/constants/inputs'
import { useAppSelector } from '@/store'
import { getHistorySelector } from '@/store/surveyHistorySlice'
import { QuestionStepProps, StepProps } from '@/types/survey'

import Header from '../Header'
import Layout from '../Layout'

import styles from './questionStep.module.scss'

const QuestionStep: React.FC<StepProps<QuestionStepProps>> = ({ step, onNextStep, onPrevStep }) => {
  const history = useAppSelector(getHistorySelector)
  const { id, key, type, question, description, options, hasBranches } = step
  const QuestionInput = useMemo(() => questionInputs[type], [type])

  const inputValue = useMemo(() => (history[id]?.response ? history[id].response : ''), [history, id])

  const handleNextStep = useCallback(
    (result: string, nextStepId: string) => {
      onNextStep(key, id, nextStepId, hasBranches, result)
    },
    [hasBranches, id, key, onNextStep],
  )

  return (
    <Layout theme="pink">
      <Header onPrevStep={onPrevStep} />
      <div className={styles.questionBlock}>
        <h1 className={styles.title}>{question}</h1>
        {description && <p className={styles.description}>{description}</p>}
        {options.length && (
          <div className={styles.inputs}>
            <QuestionInput data={options} value={inputValue!} onNextStep={handleNextStep} />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default QuestionStep

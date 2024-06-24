import React from 'react'

import type { InfoStepProps, StepProps } from '@/types/survey'

import Header from '../Header'
import Layout from '../Layout'

import styles from './infoStep.module.scss'

const InfoStep: React.FC<StepProps<InfoStepProps>> = ({ step, onNextStep, onPrevStep }) => {
  const { id, key, title, description, btnText, nextStepId, hasBranches } = step

  return (
    <Layout theme="purple">
      <Header onPrevStep={onPrevStep} />
      <div className={styles.infoBlock}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <button className={styles.link} onClick={() => onNextStep(key, id, nextStepId, hasBranches, null)}>
          {btnText}
        </button>
      </div>
    </Layout>
  )
}

export default InfoStep

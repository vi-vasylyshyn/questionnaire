import React from 'react'

import { QuestionInputPropsMap } from '@/types/survey'

import styles from './radioButtonGroup.module.scss'

const RadioButtonGroup: React.FC<QuestionInputPropsMap['radio-button-group']> = ({ value, data, onNextStep }) => (
  <ul className={styles.radioGroup}>
    {data.map(({ id, text, nextStepId }) => (
      <li key={id}>
        <button
          className={`${styles.radioButton} ${id === value ? styles.active : ''}`}
          onClick={() => onNextStep(id, nextStepId)}
        >
          {text}
        </button>
      </li>
    ))}
  </ul>
)

export default RadioButtonGroup

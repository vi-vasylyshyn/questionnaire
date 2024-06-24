import { History } from '@/store/surveyHistorySlice'
import { InfoStepProps, QuestionStepProps } from '@/types/survey'

import { findNextStep, getLastResponse } from './findNextStep'

const questionsConfig: QuestionStepProps[] = [
  {
    id: 'q1',
    key: 'question',
    hasBranches: false,
    question: 'Select your gender:',
    type: 'radio-button-group',
    options: [
      { id: '0', text: 'Female', nextStepId: 'question2' },
      { id: '1', text: 'Male', nextStepId: 'question2' },
    ],
  },
  {
    id: 'q2',
    key: 'question',
    hasBranches: true,
    question: 'So we can get to know you better, tell us about your relationship status.',
    type: 'radio-button-group',
    options: [
      { id: '0', text: 'Single', nextStepId: 'q3' },
      { id: '1', text: 'In a relationship', nextStepId: 'q4' },
    ],
  },
  {
    id: 'q3',
    key: 'question',
    hasBranches: false,
    question: 'So we can get to know you better, tell us about your relationship status.',
    type: 'radio-button-group',
    branches: {
      q2: { response: '0' },
    },
    options: [
      { id: '0', text: 'Single', nextStepId: 'q5' },
      { id: '1', text: 'In a relationship', nextStepId: 'q5' },
    ],
  },
  {
    id: 'q4',
    key: 'question',
    hasBranches: false,
    question: 'So we can get to know you better, tell us about your relationship status.',
    type: 'radio-button-group',
    branches: {
      q2: { response: '1' },
    },
    options: [
      { id: '0', text: 'Single', nextStepId: 'q6' },
      { id: '1', text: 'In a relationship', nextStepId: 'q6' },
    ],
  },
]

export const infoConfig: InfoStepProps[] = [
  {
    id: 'info1',
    key: 'info',
    hasBranches: false,
    title: 'So how does it work?',
    description: `We analyze hundreds of data points to create your unique astrological blueprint. 
    This is combined with AI to tailor-make your astrological insights, based on your options.
    We’re going to change your relationship with astrology.`,
    btnText: 'Next',
    nextStepId: ['q3', 'q4'],
  },
]

describe('findNextStep', () => {
  it('should return null if there are no branched items matched with last response in history', () => {
    const history: History = {
      q1: { response: '0', parentId: null },
      q2: { response: '3', parentId: 'q1' },
      info1: { response: null, parentId: 'q2' },
    }
    expect(findNextStep('info1', history, questionsConfig)).toBeNull()
  })
  it('should return the correct next step when there is a branch match', () => {
    const history: History = {
      q1: { response: '0', parentId: null },
      q2: { response: '1', parentId: 'q1' },
      info1: { response: null, parentId: 'q2' },
    }
    expect(findNextStep('info1', history, questionsConfig)).toBe('q4')
  })
})

describe('getLastResponse', () => {
  const history: History = {
    q1: { response: '0', parentId: null },
    q2: { response: '1', parentId: 'q1' },
    q3: { response: '2', parentId: 'q2' },
    info1: { response: null, parentId: 'q3' },
    info2: { response: null, parentId: 'info1' },
    info3: { response: null, parentId: 'info2' },
    info4: { response: null, parentId: null },
  }

  it('should return null if the step has no parent and no response', () => {
    expect(getLastResponse('info4', history)).toBeNull()
  })

  it('should return the last response for a step with intermediate null responses', () => {
    expect(getLastResponse('info2', history)).toEqual({ step: 'q3', response: '2' })
  })
})

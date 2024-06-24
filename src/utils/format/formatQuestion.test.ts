import { QuestionStepProps } from '@/types/survey'

import { formatQuestion } from './formatQuestion'

const questionConfig: QuestionStepProps[] = [
  {
    id: 'q1',
    key: 'question',
    hasBranches: false,
    question: 'What is your gender?',
    type: 'radio-button-group',
    options: [
      { id: '0', text: 'Male', nextStepId: 'q2' },
      { id: '1', text: 'Female', nextStepId: 'q2' },
    ],
  },
  {
    id: 'q2',
    key: 'question',
    hasBranches: false,
    question: 'How old are you?',
    type: 'radio-button-group',
    options: [
      { id: '0', text: '10-18', nextStepId: 'q3' },
      { id: '1', text: '19-30', nextStepId: 'q3' },
    ],
  },
]

const history = {
  q1: { response: '1' },
  q2: { response: '1' },
}

describe('formatQuestion', () => {
  it('return the original question if no expressions are defined', () => {
    const step = questionConfig[0]
    const result = questionConfig[0].question
    expect(formatQuestion(step, history, questionConfig)).toBe(result)
  })

  it('returns the original question if response is not found in history', () => {
    const step: QuestionStepProps = {
      id: 'q3',
      key: 'question',
      hasBranches: false,
      question: 'Female need to pay more attention on details. Do you agree?',
      type: 'radio-button-group',
      options: [
        { id: '0', text: 'Yes', nextStepId: 'q4' },
        { id: '1', text: 'No', nextStepId: 'q4' },
      ],
    }
    expect(formatQuestion(step, history, questionConfig)).toBe(
      'Female need to pay more attention on details. Do you agree?',
    )
  })

  it('replaces expressions with response values', () => {
    const step: QuestionStepProps = {
      id: 'q3',
      key: 'question',
      hasBranches: false,
      question:
        '{gender} in {yearsOld} need a slightly different approach to improve their relationship. Do you agreee?',
      type: 'radio-button-group',
      options: [
        { id: '0', text: 'Yes', nextStepId: 'q4' },
        { id: '1', text: 'No', nextStepId: 'q4' },
      ],
      expressions: [
        { regex: '{gender}', relationId: 'q1' },
        { regex: '{yearsOld}', relationId: 'q2' },
      ],
    }
    expect(formatQuestion(step, history, questionConfig)).toBe(
      `female in 19-30 need a slightly different approach to improve their relationship. Do you agreee?`,
    )
  })

  it('capitalizes replaced text if capitalize is true', () => {
    const step: QuestionStepProps = {
      id: 'q3',
      key: 'question',
      hasBranches: false,
      question: '{gender} need a slightly different approach to improve their relationship. Do you agreee?',
      type: 'radio-button-group',
      options: [
        { id: '0', text: 'Yes', nextStepId: 'q4' },
        { id: '1', text: 'No', nextStepId: 'q4' },
      ],
      expressions: [{ regex: '{gender}', relationId: 'q1', capilalize: true }],
    }
    expect(formatQuestion(step, history, questionConfig)).toBe(
      `Female need a slightly different approach to improve their relationship. Do you agreee?`,
    )
  })

  it('use replacedText if defined', () => {
    const step: QuestionStepProps = {
      id: 'q3',
      key: 'question',
      hasBranches: false,
      question:
        'When you are {ageRange}, you need a slightly different approach to improve their relationship. Do you agreee?',
      type: 'radio-button-group',
      options: [
        { id: '0', text: 'Yes', nextStepId: 'q4' },
        { id: '1', text: 'No', nextStepId: 'q4' },
      ],
      expressions: [
        {
          regex: '{ageRange}',
          relationId: 'q2',
          replacedText: {
            '0': 'young',
            '1': 'adult',
          },
        },
      ],
    }
    expect(formatQuestion(step, history, questionConfig)).toBe(
      `When you are adult, you need a slightly different approach to improve their relationship. Do you agreee?`,
    )
  }),
    it('returns the original question if relationId is not found in history', () => {
      const step: QuestionStepProps = {
        id: 'q3',
        key: 'question',
        hasBranches: false,
        question: '{gender} need a slightly different approach to improve their relationship. Do you agreee?',
        type: 'radio-button-group',
        options: [
          { id: '0', text: 'Yes', nextStepId: 'q4' },
          { id: '1', text: 'No', nextStepId: 'q4' },
        ],
        expressions: [{ regex: '{gender}', relationId: 'q6' }],
      }
      expect(formatQuestion(step, history, questionConfig)).toBe(
        '{gender} need a slightly different approach to improve their relationship. Do you agreee?',
      )
    })
})

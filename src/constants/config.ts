import type { InfoStepProps, QuestionStepProps } from '@/types/survey'

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
    nextStepId: ['question6', 'question8'],
  },
]

export const questionsConfig: QuestionStepProps[] = [
  {
    id: 'question1',
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
    id: 'question2',
    key: 'question',
    hasBranches: true,
    question: 'So we can get to know you better, tell us about your relationship status.',
    type: 'radio-button-group',
    options: [
      { id: '0', text: 'Single', nextStepId: 'question3' },
      { id: '1', text: 'In a relationship', nextStepId: 'question9' },
    ],
  },
  {
    id: 'question3',
    key: 'question',
    hasBranches: false,
    question: 'Are you a single parent?',
    type: 'radio-button-group',
    options: [
      { id: '0', text: 'Yes', nextStepId: 'question4' },
      { id: '1', text: 'No', nextStepId: 'question4' },
    ],
  },
  {
    id: 'question4',
    key: 'question',
    hasBranches: false,
    question: `{gender} {isParent} need a slightly different approach to improve their relationship. 
      Which statement best describes you?`,
    expressions: [
      {
        regex: '{gender}',
        relationId: 'question1',
        capilalize: true,
      },
      {
        regex: '{isParent}',
        relationId: 'question3',
        replacedText: {
          '0': 'who has children',
          '1': '',
        },
      },
    ],
    type: 'radio-button-group',
    options: [
      {
        id: '0',
        text: 'I’m very unhappy with how things are going in my relationship',
        nextStepId: 'question5',
      },
      {
        id: '1',
        text: 'I’m unhappy with parts of my relationship, but some things are working well',
        nextStepId: 'question5',
      },
      {
        id: '2',
        text: 'I’m generally happy in my relationship',
        nextStepId: 'question5',
      },
    ],
  },
  {
    id: 'question5',
    key: 'question',
    hasBranches: true,
    question: 'Do you tend to overthink?',
    type: 'radio-button-group',
    options: [
      { id: '0', text: 'Yes', nextStepId: 'info1' },
      { id: '1', text: 'No', nextStepId: 'info1' },
    ],
  },
  {
    id: 'question6',
    key: 'question',
    hasBranches: false,
    question: 'What is most important to you?',
    type: 'radio-button-group',
    branches: {
      question5: { response: '0' },
    },
    options: [
      { id: '0', text: 'Success', nextStepId: 'question7' },
      { id: '1', text: 'Romance', nextStepId: 'question7' },
      { id: '2', text: 'Stability', nextStepId: 'question7' },
      { id: '3', text: 'Freedom', nextStepId: 'question7' },
    ],
  },
  {
    id: 'question7',
    key: 'question',
    hasBranches: false,
    question: 'Where did you hear about us?',
    type: 'radio-button-group',
    options: [
      { id: '0', text: 'Poster or Billboard', nextStepId: 'results' },
      { id: '1', text: 'Friend or Family', nextStepId: 'results' },
      { id: '2', text: 'Instagram', nextStepId: 'results' },
      { id: '3', text: 'Direct Mail or Package Insert', nextStepId: 'results' },
      { id: '4', text: 'Online TV or Streaming TV', nextStepId: 'results' },
      { id: '5', text: 'TV', nextStepId: 'results' },
      { id: '6', text: 'Radio', nextStepId: 'results' },
      { id: '7', text: 'Search Engine (Google, Bing, etc.)', nextStepId: 'results' },
      { id: '8', text: 'Newspaper or Magazine', nextStepId: 'results' },
      { id: '9', text: 'Facebook', nextStepId: 'results' },
      { id: '10', text: 'Blog Post or Website Review', nextStepId: 'results' },
      { id: '11', text: 'Podcast', nextStepId: 'results' },
      { id: '12', text: 'Influencer', nextStepId: 'results' },
      { id: '13', text: 'Youtube', nextStepId: 'results' },
      { id: '14', text: 'Pinterest', nextStepId: 'results' },
      { id: '15', text: 'Other', nextStepId: 'results' },
    ],
  },
  {
    id: 'question8',
    key: 'question',
    hasBranches: false,
    question: 'Is emotional control tricky for you?',
    type: 'radio-button-group',
    branches: { question5: { response: '1' } },
    options: [
      { id: '0', text: 'Yes', nextStepId: 'question7' },
      { id: '1', text: 'Sometimes', nextStepId: 'question7' },
      { id: '2', text: 'Rarely', nextStepId: 'question7' },
      { id: '3', text: 'Not at all', nextStepId: 'question7' },
    ],
  },
  {
    id: 'question9',
    key: 'question',
    hasBranches: false,
    question: 'Are you a parent?',
    type: 'radio-button-group',
    options: [
      { id: '0', text: 'Yes', nextStepId: 'question10' },
      { id: '1', text: 'No', nextStepId: 'question10' },
    ],
  },
  {
    id: 'question10',
    key: 'question',
    hasBranches: false,
    question: `Single {gender} {isParent} need a 
    slightly different approach to find their perfect partner. 
    But first, how did you feel in your last relationship?`,
    type: 'radio-button-group',
    expressions: [
      {
        regex: '{gender}',
        relationId: 'question1',
        capilalize: false,
      },
      {
        regex: '{isParent}',
        relationId: 'question9',
        replacedText: {
          '0': 'who has children',
          '1': '',
        },
      },
    ],
    options: [
      {
        id: '0',
        text: 'I was unhappy with low things were going in my relationship',
        nextStepId: 'question11',
      },
      {
        id: '1',
        text: 'I was unhappy with parts of my relationship, but some thing were working',
        nextStepId: 'question11',
      },
      {
        id: '2',
        text: 'I was generally happy with my relationship',
        nextStepId: 'question11',
      },
      {
        id: '3',
        text: 'I’ve never been in a relationship',
        nextStepId: 'question11',
      },
    ],
  },
  {
    id: 'question11',
    key: 'question',
    hasBranches: false,
    question: 'Is your partner an introvert or extrovert?',
    type: 'radio-button-group',
    options: [
      { id: '0', text: 'Introvert', nextStepId: 'question12' },
      { id: '1', text: 'Extrovert', nextStepId: 'question12' },
      { id: '2', text: 'A bit of both', nextStepId: 'question12' },
    ],
  },
  {
    id: 'question12',
    key: 'question',
    hasBranches: false,
    question: 'What is your partner’s gender?',
    type: 'radio-button-group',
    options: [
      { id: '0', text: 'Male', nextStepId: 'question13' },
      { id: '1', text: 'Female', nextStepId: 'question13' },
    ],
  },
  {
    id: 'question13',
    key: 'question',
    hasBranches: false,
    question: 'Do you agree with the statement below?',
    description: '“My partner and I make sex a priority in our relationship”',
    type: 'radio-button-group',
    options: [
      { id: '0', text: 'Strongly agree', nextStepId: 'question14' },
      { id: '1', text: 'Agree', nextStepId: 'question14' },
      { id: '2', text: 'Neutral', nextStepId: 'question14' },
      { id: '3', text: 'Disagee', nextStepId: 'question14' },
      { id: '4', text: 'Strongly disagree', nextStepId: 'question14' },
    ],
  },
  {
    id: 'question14',
    key: 'question',
    hasBranches: false,
    question: 'When you think about your relationship goals, you feel...?',
    type: 'radio-button-group',
    options: [
      { id: '0', text: 'Optimistic! They are totally doable, with some guidance.', nextStepId: 'question7' },
      { id: '1', text: 'Cautious. I’ve struggled before, but I’m hopeful.', nextStepId: 'question7' },
      { id: '2', text: 'I’m feeling a little anxious, honestly.', nextStepId: 'question7' },
    ],
  },
]

export const surveySteps = [...questionsConfig, ...infoConfig]

import { StepKey } from '@/types/survey'
import { surveyHistoryStorage, surveyReverseHistoryStorage } from '@/utils/storage'
// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from './index'

export type HistoryItem = {
  stepKey?: StepKey
  hasBranches?: boolean
  parentId?: string | null
  response?: string | null
}

export type History = {
  [K in string]: HistoryItem
}

type InitialState = {
  history: History
  reverseHistory: string[]
}

type Response = HistoryItem & {
  stepId: string
}

const initialState: InitialState = {
  history: surveyHistoryStorage.get() || {},
  reverseHistory: surveyReverseHistoryStorage.get() || [],
}

export const surveyHistorySlice = createSlice({
  name: 'surveyHistory',
  initialState,
  reducers: {
    setHistoryItem: (state: InitialState, action: PayloadAction<Response>) => {
      const { stepId, ...restParams } = action.payload
      const history = {
        ...state.history,
        [stepId]: state.history[stepId]
          ? { ...state.history[stepId], ...restParams, parentId: state.history[stepId].parentId }
          : restParams,
      }
      state.history = history
      surveyHistoryStorage.set(history)
    },
    removeHistoryItemsAfterBranching: (state: InitialState) => {
      const prevHistory = { ...state.history }
      state.reverseHistory.forEach(historyItemKey => {
        delete prevHistory[historyItemKey]
      })
      state.history = prevHistory
      surveyHistoryStorage.set(prevHistory)
    },
    setReverseHistoryItem: (state: InitialState, action: PayloadAction<string>) => {
      const reverseHistory = [...state.reverseHistory, action.payload]
      state.reverseHistory = reverseHistory
      surveyReverseHistoryStorage.set(reverseHistory)
    },
    clearReverseHistory: (state: InitialState) => {
      state.reverseHistory = []
      surveyReverseHistoryStorage.remove()
    },
    clearHistory: (state: InitialState) => {
      state.history = {}
      surveyHistoryStorage.remove()
    },
  },
})

export const {
  setHistoryItem,
  setReverseHistoryItem,
  removeHistoryItemsAfterBranching,
  clearReverseHistory,
  clearHistory,
} = surveyHistorySlice.actions

export const getIsHistoryFilledSelector = (state: RootState) => !!Object.keys(state.survey.history).length
export const getHistorySelector = (state: RootState) => state.survey.history
export const getReverseHistorySelector = (state: RootState) => state.survey.reverseHistory
export const getLastResponseSelector = (state: RootState) => {
  const isHistoryFilled = Object.keys(state.survey.history).length
  const responsesForQuestions =
    isHistoryFilled && Object.entries(state.survey.history).filter(([, response]) => response.stepKey === 'question')
  return responsesForQuestions ? responsesForQuestions[responsesForQuestions.length - 1] : null
}

export default surveyHistorySlice.reducer

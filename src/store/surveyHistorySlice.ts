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
    removeReverseHistoryItem: (state: InitialState, action: PayloadAction<string>) => {
      const updatedReverseHistory = state.reverseHistory.filter(historyItem => historyItem !== action.payload)
      state.reverseHistory = updatedReverseHistory
      surveyReverseHistoryStorage.set(updatedReverseHistory)
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
  removeReverseHistoryItem,
  removeHistoryItemsAfterBranching,
  clearReverseHistory,
  clearHistory,
} = surveyHistorySlice.actions

export const getIsHistoryEmptySelector = (state: RootState) => !Object.keys(state.survey.history).length
export const getHistorySelector = (state: RootState) => state.survey.history
export const getReverseHistorySelector = (state: RootState) => state.survey.reverseHistory

export default surveyHistorySlice.reducer

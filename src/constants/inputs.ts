import React from 'react'

import RadioButtonGroup from '@/components/QuestionInputs/RadioButtonGroup'
import type { QuestionInputPropsMap, QuestionType } from '@/types/survey'

export const questionInputs: {
  [K in QuestionType]: React.FC<QuestionInputPropsMap[K]>
} = {
  'radio-button-group': RadioButtonGroup,
}

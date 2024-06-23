import React from 'react'

import { IconProps } from './iconProps'

const ArrowLeftIcon: React.FC<IconProps> = props => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#333333" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 12L15 4.5L16.05 5.55L9.6 12L16.05 18.45L15 19.5L7.5 12Z" />
    </svg>
  )
}
export default ArrowLeftIcon

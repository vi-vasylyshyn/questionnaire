import React from 'react'
import { useRouter } from 'next/router'

import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon'
import LogoIcon from '@/assets/icons/LogoIcon'

import styles from './header.module.scss'

export const routesWithoutNavigation = ['/', '/results', '/survey/question1']

interface HeaderProps {
  showNavigation?: boolean
  onPrevStep?: () => void
}

const Header: React.FC<HeaderProps> = ({ onPrevStep }) => {
  const { asPath } = useRouter()
  return (
    <header className={styles.header}>
      {!routesWithoutNavigation.includes(asPath) && (
        <button className={styles.link} onClick={onPrevStep}>
          <ArrowLeftIcon />
        </button>
      )}
      <LogoIcon className={styles.logo} />
    </header>
  )
}

export default Header

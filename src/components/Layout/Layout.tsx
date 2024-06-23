import React from 'react'

import styles from './layout.module.scss'

interface LayoutProps {
  theme: 'purple' | 'pink'
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ theme, children }) => {
  return (
    <div className={`${styles.layout} ${theme === 'pink' ? styles.pinkTheme : styles.purpleTheme}`}>{children}</div>
  )
}

export default Layout

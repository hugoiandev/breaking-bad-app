import React, { ReactChild } from 'react'
import styles from './Container.module.scss'

interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps): JSX.Element => {
  return (
    <main className={styles.container}>
      {children}
    </main>
  )
}

export default Container

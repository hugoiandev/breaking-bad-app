import React from 'react'
import Image from 'next/image'
import img from '../../../public/assets/img/Breaking-Bad-Logo.png'
import styles from './Header.module.scss'

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Image
        src={img}
        alt='Logo Breaking Bad'
      />
    </header>
  )
}

export default Header

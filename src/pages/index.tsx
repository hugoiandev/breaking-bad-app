import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Container from '../components/Container'
import styles from '../styles/Characters.module.scss'
import { GET_CHARACTERS } from "../utils/endpoints"
import iconBrBd from '../../public/assets/icons/brbd.svg'
import { gsap, Power4 } from 'gsap'
import { DivElement } from '../utils/types'

interface CharacterTypes {
  char_id: string
  name: string
  img: string
  birthday: string
  status: string
}

interface CharacterProps {
  characters: CharacterTypes[]
}

const Characters = ({ characters }: CharacterProps): JSX.Element => {
  const overload = React.useRef<DivElement>(null)
  const overloadIcon = React.useRef<DivElement>(null)

  // Gsap animation
  React.useEffect(() => {
    gsap.to(overload.current, {
      duration: .6,
      bottom: '100%',
      ease: Power4.easeInOut,
      delay: 1.5
    })

    gsap.to(overloadIcon.current, {
      duration: .6,
      rotate: '-360deg',
      fill: 'forwards',
      ease: 'linear'
    })

    gsap.to(overloadIcon.current, {
      duration: .6,
      y: -50,
      opacity: 0,
      ease: Power4.easeInOut,
      delay: 1
    })
  }, [])

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="shurtcut icon" href="/assets/favicon/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <div className={styles.characterContainer}>
          {characters && characters.map((item) => {
            return (
              <Link passHref key={item.char_id} href={`/details/${item.char_id}`}>
                <div className={styles.character}>
                  <div>
                    <img className={styles.img} src={item.img} alt={item.name} />
                  </div>
                  <div className={styles.attributes}>
                    <span className={styles.name}>{item.name}</span>
                    <span>Nascimento: {item.birthday}</span>
                    <span>Status: {item.status}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
      <Footer />
      <div
        className={styles.overload}
        ref={overload}
      >
        <div
          ref={overloadIcon}
          className={styles.overloadIcon}
        >
          <Image
            src={iconBrBd}
            alt='Icon Breaking Bad'
            width={100}
            height={100}
          />
        </div>
      </div>
    </>
  )
}

// Server side function
export async function getStaticProps() {
  // Get characters
  const { url } = GET_CHARACTERS()
  const response = await fetch(url)
  const json = await response.json()
  
  return {
    props: {
      characters: json
    },
    revalidate: 7000
  }
}

export default Characters

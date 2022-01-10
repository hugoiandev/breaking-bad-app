import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Container from '../../components/Container'
import { GET_CHARACTER, GET_CHARACTERS, GET_EPISODES } from '../../utils/endpoints'
import styles from './Details.module.scss'
import iconBackUrl from '../../../public/assets/icons/arrow.svg'
import iconBrBd from '../../../public/assets/icons/brbd.svg'
import { gsap, Power4 } from 'gsap'
import { DivElement } from '../../utils/types'

interface CharacterTypes {
  birthday: string
  category: string
  nickname: string
  status: string
  occupation: string[]
  char_id: string | number
  img: string
  name: string
}

interface EpisodeosTypes {
  title: string
  episode_id: number
}

interface CharacterProps {
  char: CharacterTypes[]
  ep: EpisodeosTypes[]
}

const Details = ({ char, ep }: CharacterProps): JSX.Element => {
  const { back } = useRouter()
  const overload = React.useRef<DivElement>(null)
  const overloadIcon = React.useRef<DivElement>(null)


  // Gsap animation
  React.useEffect(() => {
    gsap.to(overload.current, {
      duration: .6,
      top: '100%',
      ease: Power4.easeInOut,
      delay: 1.5
    })

    gsap.to(overloadIcon.current, {
      duration: .6,
      rotate: '360deg',
      fill: 'forwards',
      ease: 'linear'
    })

    gsap.to(overloadIcon.current, {
      duration: .6,
      y: 50,
      opacity: 0,
      ease: Power4.easeInOut,
      delay: 1
    })
  }, [])

  return (
    <>
      <Head>
        <title>Details</title>
        <link rel="shurtcut icon" href="/assets/favicon/favicon.ico" />
      </Head>
      <Container>
        {char && char.map((item): JSX.Element => {
          return (
            <div key={item.char_id}>
              <div className={styles.containerImg}>
                <div className={styles.charImg}>
                  <img className={styles.img} src={item.img} alt={item.name}/>
                </div>
                <div className={styles.name}>
                  <h1>{item.name}</h1>
                </div>
                <button
                  className={styles.button}
                  onClick={back}
                >
                  <Image
                    src={iconBackUrl}
                    alt='Icon Arrow'
                    width={50}
                    height={50}
                  />
                </button>
              </div>
              <div className={styles.attributes}>
                <h2>Info</h2>
                <span>Nascimento: {item.birthday}</span>
                <span className={styles.occupation}>
                  {`Ocupação:${item.occupation.map((item) =>  ' ' + item)}`}
                </span>
                <span>Status: {item.status}</span>
                <span>Apelido: {item.nickname}</span>
                <span>Categoria: {item.category}</span>
              </div>
              <div className={styles.episodes}>
                <h2>Episodeos em que participou</h2>
                <div className={styles.containerList}>
                  <ul className={styles.list}>
                    {ep && ep.map((item) => {
                      return (
                        <li key={item.episode_id}>{item.title}</li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </Container>
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
export async function getStaticPaths() {
  // Get character
  const { url } = GET_CHARACTERS()
  const res = await fetch(url)
  const chars = await res.json()

  const paths = chars.map((chars: CharacterTypes) => {
    return { params: { id: chars.char_id.toString() } }
  })

  return { paths, fallback: false }
  
}

export async function getStaticProps({ params }) {
  const { url } = GET_CHARACTER(params.id)

  const res = await fetch(url)
  const char = await res.json()
  const name = char.map((item) => item.name)

  // Get episodes
  const episodeos = GET_EPISODES()
  const resEp = await fetch(episodeos.url)
  const jsonEp = await resEp.json()

  const result = jsonEp.filter((item) => {
    return item.characters.find((item) => item === name[0])
  })

  return {
    props: { 
      char,
      ep: result 
    },
    revalidate: 7000
  }
}

export default Details

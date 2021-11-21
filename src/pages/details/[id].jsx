import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Container from '../../components/Container'
import { GET_CHARACTER, GET_EPISODES } from '../../utils/endpoints'
import styles from './Details.module.scss'
import iconBackUrl from '../../../public/assets/icons/arrow.svg'
import iconBrBd from '../../../public/assets/icons/brbd.svg'
import { gsap, Power4 } from 'gsap'

const Details = ({ character, ep }) => {
  const { back } = useRouter()
  const overload = React.useRef()
  const overloadIcon = React.useRef()

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
      <Container>
        {character && character.map((item) => {
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
export async function getServerSideProps({ params }) {
  // Get character
  const char = GET_CHARACTER(params.id)
  const responseChar = await fetch(char.url)
  const jsonChar = await responseChar.json()
  const name = jsonChar.map((item) => item.name)

  // Get episodes
  const episodeos = GET_EPISODES()
  const responseEp = await fetch(episodeos.url)
  const jsonEp = await responseEp.json()

  const result = jsonEp.filter((item) => {
    return item.characters.find((item) => item === name[0])
  })

  return {
    props: {
      character: jsonChar,
      ep: result
    }
  }
}

export default Details

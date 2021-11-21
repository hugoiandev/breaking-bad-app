const BASE_URL = 'https://www.breakingbadapi.com/api'

export const GET_CHARACTERS = () => {
  return {
    url: BASE_URL + '/characters'
  }
}

export const GET_CHARACTER = (id) => {
  return {
    url: BASE_URL + `/characters/${id}`
  }
}

export const GET_EPISODES = () => {
  return {
    url: BASE_URL + '/episodes'
  }
}
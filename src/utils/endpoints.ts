
interface EndpointType {
  url: string
}

const BASE_URL: string = 'https://www.breakingbadapi.com/api'


export const GET_CHARACTERS = (): EndpointType => {
  return {
    url: BASE_URL + '/characters'
  }
}

export const GET_CHARACTER = (id: string): EndpointType => {
  return {
    url: BASE_URL + `/characters/${id}`
  }
}

export const GET_EPISODES = (): EndpointType => {
  return {
    url: BASE_URL + '/episodes'
  }
}
import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CITIES = 'GET_CITIES';

/**
 * ACTION CREATORS
 */
const getCities = cities => ({type: GET_CITIES, cities})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default (state = [], action) => {
  switch(action.type) {
    case GET_CITIES:
      return action.cities
    default:
      return state
  }
}

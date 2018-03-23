import { city } from '../../scripts/models'

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
// export const getCitiesDB = () => {
//   return database.ref('/').once('value')
// }

// // add new section
// export const addCity = (name, coords, icon) => {
//   let key = database.ref('/').push().key
//   let model = sectionModel(key, name, firebase.database.ServerValue.TIMESTAMP)
//   return database.ref('/'+ key).set(model)
// }

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

// import { city } from '../../models';
// import { db } from '../index';

/**
 * ACTION TYPES
 */
const GET_CITIES = 'GET_CITIES';

/**
 * ACTION CREATORS
 */
// const getCities = cities => ({type: GET_CITIES, cities});

/**
 * THUNK CREATORS
 */
// export const getCitiesDB = () => {
//   return db.ref('/').once('value')
// }

// // add new section
// export const addCity = (name, coords, icon) => {
//   let key = db.ref('/').push().key
//   let model = sectionModel(key, name, firebase.db.ServerValue.TIMESTAMP)
//   return db.ref('/'+ key).set(model)
// }

/**
 * REDUCER
 */
export default (state = [], action) => {
  switch(action.type) {
    case GET_CITIES:
      return action.cities;
    default:
      return state;
  }
};

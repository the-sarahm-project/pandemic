import { getGameRef, getCityRef } from '../../index';

export const treatDisease = async ({ firestore, currentCity}, disease ) => {
  const game = await getGameRef(firestore);
  const currentCitySnapshot = await getCityRef(game, currentCity.id).get();
  const [color, numCubes] = disease.split(',');
  // update city's disease cube count.
  await currentCitySnapshot.ref.update({[color]: numCubes - 1});
  const colorDiseaseCube = `${color}DiseaseCubes`;

  //update remaining disease cube count
  await game.ref.update({[colorDiseaseCube]: game.data()[colorDiseaseCube] + 1});
};

import { getGameRef, getCityRef } from '../../index';
import { updateActionsRemaining } from './index';

export const treatDisease = async function({ firestore, currentCity, actionsRemaining, nextTurn }, disease ) {
  try {
    const game = await getGameRef(firestore);
    const currentCitySnapshot = await getCityRef(game, currentCity.id).get();
    const [color, numCubes] = disease.split(',');
    // update city's disease cube count.
    await currentCitySnapshot.ref.update({[color]: numCubes - 1});
    const colorDiseaseCube = `${color}DiseaseCubes`;
    //update remaining disease cube count
    await game.ref.update({[colorDiseaseCube]: game.data()[colorDiseaseCube] + 1});
    await updateActionsRemaining(game, actionsRemaining, nextTurn);
  } catch(err) {
    console.log(err);
  }
};

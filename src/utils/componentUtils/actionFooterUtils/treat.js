import { getGameRef, getCityRef } from '../../index';
import { updateActionsRemaining } from './index';

export const treatDisease = async function({ ownCity, actionsRemaining, nextTurn }, disease ) {
  try {
    const game = await getGameRef();
    const cityRef = await getCityRef(ownCity.id);
    const ownCitySnapshot = await cityRef.get();
    const [color, numCubes] = disease.split(',');
    // update city's disease cube count.
    await ownCitySnapshot.ref.update({[color]: numCubes - 1});
    const colorDiseaseCube = `${color}DiseaseCubes`;
    //update remaining disease cube count
    await game.ref.update({[colorDiseaseCube]: game.data()[colorDiseaseCube] + 1});
    await updateActionsRemaining(actionsRemaining, nextTurn);
  } catch(err) {
    console.log(err);
  }
};

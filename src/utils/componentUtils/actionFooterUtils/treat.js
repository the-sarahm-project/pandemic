import { getCityRef } from '../../index';
import { updateActionsRemaining } from './index';
import { getGameRef } from '../../getFirestoreData';

export const treatDisease = async function({ self, actionsRemaining, nextTurn }, disease ) {
  try {
    const ownCity = self.currentCity;
    console.log(`Treating Disease at ${ownCity}!`);
    const gameRef = await getGameRef();
    const gameSnapshot = await gameRef.get();
    const cityRef = await getCityRef(ownCity, gameRef);
    const ownCitySnapshot = await cityRef.get();
    const [color, numCubes] = disease.split(',');
    const colorDiseaseCube = `${color}DiseaseCubes`;
    // update city's disease cube count and remaining disease cube count
    if (self.role === 'Medic') {
      await ownCitySnapshot.ref.update({[color]: 0})
      await gameSnapshot.ref.update({[colorDiseaseCube]: gameSnapshot.data()[colorDiseaseCube] + numCubes});
    } else {
      await ownCitySnapshot.ref.update({[color]: numCubes - 1});
      await gameSnapshot.ref.update({[colorDiseaseCube]: gameSnapshot.data()[colorDiseaseCube] + 1});
    }
    await updateActionsRemaining(actionsRemaining, nextTurn);
  } catch(err) {
    console.log(err);
  }
};

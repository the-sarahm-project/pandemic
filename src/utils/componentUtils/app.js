import { init, setupLogic } from '../index';
import { db } from '../../store';

export const initAndSetupGame = async (numPlayers, difficultyLevel, create) => {
  if (!create) return;
  try {
    console.log('initializing game');
    const newDoc = await init(db, numPlayers, difficultyLevel);
    console.log('setting up game');
    await setupLogic(db.collection('games').doc(newDoc), difficultyLevel);
    console.log('done!');
    return newDoc;
  } catch(err) {
    console.log(err);
  }
};

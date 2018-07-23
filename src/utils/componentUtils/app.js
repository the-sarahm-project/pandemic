import { init, setupLogic } from '../index';
import { db } from '../../store';

export const initAndSetupGame = async (name, numPlayers, difficultyLevel, create) => {
  if (!create) return;
  try {
    console.log(difficultyLevel);
    const newDoc = await init(db, name, numPlayers, difficultyLevel);
    console.log(newDoc);
    await setupLogic(db.collection('games').doc(newDoc), difficultyLevel);
    console.log('done!');
    return newDoc;
  } catch(err) {
    console.log(err);
  }
};

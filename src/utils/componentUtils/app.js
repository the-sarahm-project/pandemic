import { init, setupLogic } from '../index';
import { db } from '../../store';

export const initAndSetupGame = async (password, numPlayers, difficultyLevel, create) => {
  if (!create) return;
  try {
    const newDoc = await init(db, password, numPlayers, difficultyLevel);
    console.log(newDoc);
    await setupLogic(db.collection('games').doc(newDoc), numPlayers, difficultyLevel);
    console.log('done!');
    return 'done';
  } catch(err) {
    console.log(err);
  }
};

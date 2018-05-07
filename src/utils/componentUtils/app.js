import { init, setupLogic } from '../index';
import { db } from '../../store';

export const initAndSetupGame = async (numPlayers, difficultyLevel, create) => {
  if (!create) return;
  const newDoc = await init(db, numPlayers, difficultyLevel);
  console.log(newDoc);
  await setupLogic(db.collection('games').doc(newDoc), numPlayers, difficultyLevel);
};

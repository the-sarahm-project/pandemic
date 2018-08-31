import { getGameRef } from "../../getFirestoreData";

export const dispatch = async (isDispatching, dispatchTarget) => {
  console.log('Dispatching!');
  const gameRef = await getGameRef();
  isDispatching = dispatchTarget ? false : !isDispatching;
  return await gameRef.update({ dispatchTarget: null, isDispatching });
};

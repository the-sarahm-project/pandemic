export * from './build';
export * from './move';
export * from './share';
export * from './cure';
export * from './treat';

export const updateActionsRemaining = async (game, actionsRemaining, nextActivePlayer) => {
  await game.ref.update({ actionsRemaining: actionsRemaining - 1});
  if (actionsRemaining === 1) {
    await game.ref.update({ currentTurn: nextActivePlayer, actionsRemaining: 3 });
  }
};

export const updateActionsRemaining = async (game, actionsRemaining, nextTurn) => {
  await game.ref.update({ actionsRemaining: actionsRemaining - 1});
  if (actionsRemaining === 1) {
    await game.ref.update({ currentTurn: nextTurn, actionsRemaining: 3 });
  }
};

export * from './build';
export * from './move';
export * from './share';
export * from './cure';
export * from './treat';

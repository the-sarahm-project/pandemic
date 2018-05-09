import { setCureMarker, removeCards, updateCurrentHand, cureButtonDisabled, getCureDisabled } from './cure';

describe('build', () => {
  describe('cureDisease', () => {
    it('does something', () => {
      expect(2).toEqual(2);
    });
  });

  describe('setCureMarker', () => {
    const update = jest.fn();
    const game = {
      ref: {
        update
      }
    };
    const color = 'blue';

    it('calls update on the game ref with given color', () => {
      setCureMarker(game, color);
      expect(update).toHaveBeenCalledWith({ [`${color}CureMarker`]: true });
    });
  });

  describe('removeCards', () => {
    const remove = jest.fn();
    const cardsToRemove = new Array(5).fill({delete: remove});
    it('calls delete on all cards in cardsToRemove', () => {
      removeCards(cardsToRemove);
      expect(remove).toHaveBeenCalledTimes(5);
    });
  });

  describe('updateCurrentHand', () => {
    const update = jest.fn();
    const currentPlayerSnapshot = {
      ref: {
        update
      },
      data: () => ({
        currentHand: [
          {id: 'Atlanta', color: 'blue'},
          {id: 'Paris', color: 'blue'},
          {id: 'Lima', color: 'yellow'}
        ]
      })
    };
    const cardsToRemove = [
      {id: 'Atlanta', color: 'blue'},
      {id: 'Paris', color: 'blue'},
    ];

    updateCurrentHand(currentPlayerSnapshot, cardsToRemove);
    it('calls update with the new hand', () => {
      expect(update).toHaveBeenCalled();
    });

    it('calls update with the all the other cards filtered out.', () => {
      expect(update).toHaveBeenCalledWith({ currentHand: [{id: 'Lima', color: 'yellow'}] });
    });
  });

  describe('cureButtonDisabled', () => {
    it('does something', () => {
      expect(2).toEqual(2);
    });
  });

  describe('getCureDisabled', () => {
    it('does something', () => {
      expect(2).toEqual(2);
    });
  });
});

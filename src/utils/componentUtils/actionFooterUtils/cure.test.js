import { cureDisease, setCureMarker, removeCards, updateCurrentHand, cureButtonDisabled } from './cure';

describe('cure', () => {
  describe('cureDisease', () => {
    const currentHandUpdate = jest.fn();
    const currentPlayerSnapshot = {
      ref: {
        update: currentHandUpdate
      },
      data: () => ({
        currentHand: [
          {id: 'Atlanta', color: 'blue'},
          {id: 'Paris', color: 'blue'},
          {id: 'Lima', color: 'yellow'}
        ]
      })
    };
    const doc = () => ({
      get: () => currentPlayerSnapshot
    });
    const collection = () => ({
      doc
    });
    const setCureMarkerUpdate = jest.fn();
    const testGame = {
      ref: {
        collection,
        update: setCureMarkerUpdate
      }
    };
    const testFirestore = {
      get: () => testGame
    };
    describe('When given exactly 5 cards to remove', () => {
      const remove = jest.fn();
      const cardsToRemove = new Array(5).fill({delete: remove});
      cureDisease(testFirestore, {}, {}, [], cardsToRemove);
      it('calls updateCurrentHand', () => {
        expect(currentHandUpdate).toHaveBeenCalled();
      });

      it('calls setCureMarker', () => {
        expect(setCureMarkerUpdate).toHaveBeenCalled();
      });

      it('calls removeCards', () => {
        expect(remove).toHaveBeenCalledTimes(5);
      });
    });

    describe('When not given 5 cards to remove', () => {
      it('When given less than 5 cards', async () => {
        const cardsToRemove = new Array(3).fill({});
        const message = await cureDisease(testFirestore, {}, {}, [], cardsToRemove);
        expect(message).toEqual('Please select 5 cards');
      });
    });

    describe('When not given 5 cards to remove', () => {
      it('When given less than 5 cards', async () => {
        const cardsToRemove = new Array(7).fill({});
        const message = await cureDisease(testFirestore, {}, {}, [], cardsToRemove);
        expect(message).toBe('Please select 5 cards');
      });
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
    const curedFalse = {
      blueCureMarker: false
    };
    const curedTrue = {
      blueCureMarker: true
    };
    const currentCityBlue = {
      color: 'blue'
    };
    const currentHandBlue = [
      {id: 'Atlanta', color: 'blue'},
      {id: 'Paris', color: 'blue'},
      {id: 'Lima', color: 'yellow'},
      {id: 'Madrid', color: 'blue'},
      {id: 'London', color: 'blue'},
      {id: 'Essen', color: 'blue'}
    ];
    const currentHandYellow = [
      {id: 'Santiago', color: 'yellow'},
      {id: 'Miami', color: 'yellow'},
      {id: 'Lima', color: 'yellow'},
      {id: 'LosAngeles', color: 'yellow'},
      {id: 'Bogota', color: 'yellow'},
      {id: 'Essen', color: 'blue'}
    ];
    const unusedCityCards = {
      Atlanta: {
        color: 'blue'
      },
      Paris: {
        color: 'blue'
      },
      Madrid: {
        color: 'blue'
      },
      London: {
        color: 'blue'
      },
      Essen: {
        color: 'blue'
      },
      Lima: {
        color: 'yellow'
      },
      Santiago: {
        color: 'yellow'
      },
      Miami: {
        color: 'yellow'
      },
      LosAngeles: {
        color: 'yellow'
      },
      Bogota: {
        color: 'yellow'
      }
    };
    describe('Disabled', () => {
      it(`is disabled when that color is already cured`, () => {
        const disabled = cureButtonDisabled(curedTrue, currentCityBlue, currentHandBlue, unusedCityCards);
        expect(disabled).toEqual(true);
      });

      it('is disabled when there are not enough cards that match currentCity color', () => {
        const disabled = cureButtonDisabled(curedFalse, currentCityBlue, currentHandYellow, unusedCityCards);
        expect(disabled).toEqual(true);
      });
    });

    describe('Enabled', () => {
      it(`is enabled when there are enough cards of the current city's color and that color is not cured`, () => {
        const disabled = cureButtonDisabled(curedFalse, currentCityBlue, currentHandBlue, unusedCityCards);
        expect(disabled).toEqual(false);
      });
    });
  });
});

import { setSelectedAndActive } from './chooseCardModal';

/*
export const setSelectedAndActive = function(cardId, card) {
  this.setState(prevState => {
    const selected = !prevState.active[cardId] ? [...prevState.selected, card] : prevState.selected.filter(card => card.id !== cardId);
    const active = { ...prevState.active,
      [cardId]: !prevState.active[cardId]
    };
    return {
      selected,
      active
    };
  });
};
*/

describe('chooseCardModal', () => {
  describe('setSelectedAndActive', () => {
    const cardModal = {
      setState: ({}) => {}
    };
    const prevState = {
      selected: [

      ],
      active:
    }
    const state = {

    }
    const setSelectedAndActive2 = setSelectedAndActive.bind(cardModal);
    it('returns if create is false', () => {
      expect(setSelectedAndActive2()).toBe(undefined);
    });
  });
});

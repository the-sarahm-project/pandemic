import { setSelectedAndActive } from './chooseCardModal';

describe('chooseCardModal', () => {
  describe('setSelectedAndActive', () => {
    const prevState = {
      selected: [
        {id: 1},
        {id: 2}
      ],
      active: {
        1: true,
        2: true,
        3: false,
        4: false,
      }
    };
    const cardModal = {
      setState: jest.fn((getSelectedAndActive) => getSelectedAndActive(prevState))
    };
    const boundSetSelectedAndActive = setSelectedAndActive.bind(cardModal);

    it('calls setState', () => {
      boundSetSelectedAndActive({id: 3});
      expect(cardModal.setState).toHaveBeenCalled();
    });

    describe('if a card is not selected', () => {
      it('adds the card to selected', () => {
        expect(boundSetSelectedAndActive({id: 3}).selected).toEqual([...prevState.selected, {id: 3}]);
      });

      it(`toggles the card's active state to true`, () => {
        expect(boundSetSelectedAndActive({id: 3}).active).toEqual({...prevState.active, 3: true});
      });
    });

    describe('if a card is already selected', () => {
      it('removes the card from selected', () => {
        expect(boundSetSelectedAndActive({id: 2}).selected).toEqual([...prevState.selected.filter(card => card.id !== 2)]);
      });

      it(`toggles the card's active state to false`, () => {
        expect(boundSetSelectedAndActive({id: 2}).active).toEqual({...prevState.active, 2: false});
      });
    });
  });
});

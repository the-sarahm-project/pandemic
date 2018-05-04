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

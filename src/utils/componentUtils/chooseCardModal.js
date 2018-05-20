export const setSelectedAndActive = function(card) {
  return this.setState(prevState => {
    const selected = !prevState.active[card.id] ? [...prevState.selected, card] : prevState.selected.filter(prevCard => prevCard.id !== card.id);
    const active = { ...prevState.active,
      [card.id]: !prevState.active[card.id]
    };
    return {
      selected,
      active
    };
  });
};

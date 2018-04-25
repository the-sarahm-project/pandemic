import L from 'leaflet';

export const PlayerIcon = L.Icon.extend({
  options: {
    iconSize: [50, 50]
  }
});

export const playerIconContainer = {
  'Contingency Planner': new PlayerIcon({ iconUrl: 'assets/images/cont_planner.png' }),
  Dispatcher: new PlayerIcon({ iconUrl: 'assets/images/dispatcher.png' }),
  Medic: new PlayerIcon({ iconUrl: 'assets/images/medic.png' }),
  'Operations Expert': new PlayerIcon({ iconUrl: 'assets/images/ops_expert.png' }),
  'Quarantine Specialist': new PlayerIcon({ iconUrl: 'assets/images/quar_spec.png' }),
  Researcher: new PlayerIcon({ iconUrl: 'assets/images/researcher.png' }),
  Scientist: new PlayerIcon({ iconUrl: 'assets/images/scientist.png' }),
};

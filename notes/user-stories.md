# START OF APP
## As a user, I want to...
- Log in.
- Sign up.
- Join a game (with/without password).
- Create a game.
- See the rules page at ALL TIMES.

# PRIOR TO GAME START
## As a host, I want to be able to...
- Start the game (button is available after 1 person joins).
- Kick people out.
- Reserve spots.
- Set difficulty level (infection marker starting point)
- Choose whether cards should be played face up or not.

## As a user that joins a game, I want to...
- Be able to leave the game. (bye)
- Be able to chat with people in the game.

# SETUP
## As a player, I want to...
- See the board with all the cities and connection lines and colors.
- Watch as one research station is placed in Atlanta.
- Watch as outbreaks and cure markers are placed.
- Watch as the infection rate marker is placed.
- Watch as the Infection cards are flipped.
- Watch as cities are infecte with disease cubes.
- Watch as each player receives a role.
- Watch as the player pawns are placed in Atlanta.
- Watch as the Epidemic cards are shuffled into the Player Deck.
- Watch as cards are distributed according to the number of players.
- See my own hand and if host chooses, everyone else's current hand.
- Be able to see how many cards are in the discard pile (possibly inspect/search through them).
- See who is automatically selected to go first.

# CHARACTER ROLES
## As the Contingency Planner, I want to be able to...
- As an action, take an Event card from anywhere in the Player Discard Pile and place it on his Role card. Only 1 Event card can be on his role card at a time. It does not count against his hand limit.
  - When the Contingency Planner plays the Event card on his role card, remove this Event card from the game (instead of discarding it).

## As the Dispatcher, I want to be able to...
- As an action, move any pawn, if its owner agrees, to any city containing another pawn, or
- As an action, move another player's pawn, if its owner agrees, as if it were his own.
  - When moving a player's pawn as if it were your own, discard cards for Direct and Charter Flights _your_ hand. A card discarded for a Charter Flight must match the city the pawn is moving from.
  - The Dispatcher can only _move_ other players' pawns; he may not direct them to do other actions, such as Treat Disease.

## As the Medic, I want to be able to...
- remove _all_ cubes, not 1, of the same color when doing the Treat Disease action.
  - If a disease has been _cured_, he automatically removes all cubes of that color from a city, simply by entering it or being there. This does not take an action.
  - The Medic's automatic removal of cubes can occur on other players' turns, if he is moved by the Dispatcher or the Airlift Event
  - The Medic also prevents placing disease cubes (and outbreaks) of _cured_ diseases in his location.

## As the Operations Expert, I want to be able to...
- As an action, build a research stationin his current city without discarding (or using) a City card, or
- As an action, once per turn, move from a research station to any city by discarding any City card.
  - The Dispatcher may not use the Operations Expert's special move ability when moving the OPeration Expert's pawn.

## As the Quarantine Specialist, I want to be able to...
- Prevent both outbreaks and the placement of disease cubes in the city she is in _and_ all cities connected to that city. She does not affect cubes placed during setup.

## As the Researcher, I want to be able to...
- When doing the Share Knowledge action, the Researcher may give any City card from her hand to another player in the same city as her, _without_ this card having to match her city. The transfer must be _from_ her hand to the other player's hand, but it can occur on either player's turn.

## As the Scientist, I want to be able to...
- Need only 4 (not 5) City cards of the same disease color to Discover a Cure for that disease.

# PLAY GAME
## As a player, I want to...
- Fake play -> visualize the strategy => don't let them actually do something wrong/tell them it's wrong. It won't be solid until the last play is performed: "Are you sure you want to do this?"
- Not be able to make illegal moves- the game should prevent them from happening.
  - All options that are AVAILABLE should become available on player turn, and all other options should be left hidden/blacked out.

## MOVEMENT ACTIONS
### As a player, I want to be able to...
- Drive/Ferry
  - Move to a city connected by a white line to the one you are in.
- Direct Flight
  - Discard a City card to move to the city named on the card
- Charter Flight.
  - Discard the City card that _matches_ the city you are in to move to _any_ city.
- Shuttle Flight
  - Move from a city with a research station to any other city that has a research station.

## OTHER ACTIONS
### As a player, I want to be able to...
- Build a Research Station
  - Discard the city card that matches the city you are in to place a research station there. Take the research station from the pile next to the board. If all 6 research stations have been built, take a research station from anywhere on the board.
- Treat Disease
  - Remove 1 disease cube from the city you are in, placing it in the cube supply next to the board. If this disease color has been cured, remove all cubes of that color from the city you are in.
  - If the _last_ cube of a _cured disease_ is removed from the board, this disease is _eradicated_. Flip its cure marker from its "vial" side to its "_cured_" side.
- Share Knowledge
  - _Give_ the City card that matches the city you are in to another player or
  - _Take_ the City card that matches the city you are in from another player.
  - The other player must also be in the city with you. Both of you need to agree to do this.
  - If the player who gets the card now has more than 7 cards, that player must immediately discard a card or play an Event card.
- Discover a Cure
  - At _any_ research station, discard 5 City cards of the same color from your hand to cure the disease _of that color_. Move the disease's cure marker to its Cure Indicator.
  - If no cubes of this color are on the board, this disease is now _eradicated_. Flip its cure marker from its "vial" side to its "_cured_" side.

## EVENT CARDS
- These cards do not require actions to be played and may be played at any time.
### Resilient Population. I want to be able to...
- Remove from the game an infection card in the infection discard deck.

### Airlift
- Move a pawn to any city. If played on another player's pawn you must have permission to move it.

### Forecast
- Look at the top 6 cards of the infection deck and put them in any order you choose then put them back on top of the infection deck.

### One Quiet Night
- Skip the next Infect Cities step (do not flip over any Infection Cards).

### Government Grant
- Put a research station on any city.

## DRAW CARDS
### Epidemics
- Epidemics should be handled properly
  - Increase: Move the infection rate marker forward 1 space on the Infection Rate Track.
  - Infect: Draw the _bottom_ card from the Infection Deck. Unless is disease color has been eradicated, put 3 disease cubes of that color on the named city. If the city already has cubes of this color, do not add 3 cubes to it. Instead, add just enough cubes so that it has 3 cubes of this color and then an _outbreak_ of this disease occurs in the city. Discard this card to the Infection Discard Pile.
  - Intensify: Reshuffle just the cards in the Infection Discard Pile and place them on top fo the Infection Deck.

### Hand Limit
- Hand limit should be handled properly
  - If you ever have more than 7 cards in hand (after first resolving any Epidemic cards you may have drawn), discard cards or play Event cards until you have 7 cards in hand.

### Infections
- Infections should be handled properly
  - Flip over as many Infection cards from the top of the Infection Deck as the current _infection rate_. This number is below the space of the Infection Rate Track that has the infection rate marker. Flip these cards over one at a time, infecting the city named on each card.
  - To infect a city, place 1 disease cube matching its color onto the city, unless this disease has been eradicated. If the city already has 3 cubes of this color, do not place a 4th cube. Instead, an _outbreak_ of this disease occurs in the city. DIscard this card to the Infection Discard Pile.

## OUTBREAKS
### As a player, I want...
- Outbreaks to be handled properly
  - Do not add a 4th cube to a city with 3 cubes.
  - Move the outbreaks marker forward 1 space on the Outbreaks Track.
  - Place 1 cube of the disease color on every city connected to the city.
- Chain outbreaks to be handled properly
  - Do not add a cube to cities that have already had an outbreak.

## TURN END
### As a player, I want...
- To be prompted to end my turn.
- The player on my left to begin his/her turn.

# END GAME
## As a player, I want...
- To win as as soon as cures to all 4 diseases are discovered.
- To lose if:
  - The outbreaks marker reaches the last space of the Outbreaks Track
  - I am unable to place the number of disease cubes _actually needed on the board_
  - A player cannot draw 2 Player cards after doing his actions.

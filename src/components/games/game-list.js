import React from 'react';
import Game from './game';

export default function GameList(props) {
  const { controls, games } = props;

  return (
    <div className="games">
      {games.length === 0
        ? <div className="games__no-games">
          <p>There are no games to list.</p>
        </div>
        : <ul className="games__list">
          {games.map(game =>
            <Game
              controls={controls}
              game={game}
              key={game.id}
              removeButton={!!game.isUserGame}
            />
          )}
        </ul>}
    </div>
  );
}

GameList.defaultProps = {
  controls: false,
  games: []
};
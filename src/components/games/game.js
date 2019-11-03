import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeGameFromShelf, addGameToShelf } from '../../actions/users';
import Button from '../button';

export function Game(props) {
  const {
    controls, dispatch, removeButton, game
  } = props;

  return (
    <li className="game" id={game.id}>
      <h3 className="game__title">
        <Link
          className="game__title-link"
          to={`/games/${game.id}`}
        >
          {game.title}
        </Link>
      </h3>
      <ul className="game__details">
        <li className="game__players"><strong>Players:</strong> {game.players.min} - {game.players.max}</li>
      </ul>
      {controls && (
        <section className="game__buttons">
          <Button
            centered
            className={removeButton ? "btn--remove" : "btn--add"}
            game
            primary
            onClick={() => dispatch(removeButton ? removeGameFromShelf(game) : addGameToShelf(game))}
            label={removeButton ? "Remove" : "Add"}
          />
        </section>
      )}
    </li>
  );
};

Game.defaultProps = {
  controls: false,
  removeButton: true,
  game: {},
};

export default connect()(Game);
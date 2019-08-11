import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeGameFromShelf } from '../../actions/users';

import Button from '../button';

export function Game(props) {
  const { controls, dispatch, editButton, removeButton, game } = props;
  const tags = game.tags.map(tag => (<li key={game.id + '_' + tag.id} id={game.id + '_' + tag.id}>{tag.name}</li>));
  return (
    <li className="game" id={game.id}>
      <h3 className="game__title">{game.title}</h3>
      <ul className="game__details">
        <li><strong>Players:</strong> {game.players.min} - {game.players.max}</li>
        <li>
          <strong>Tags</strong>
          <ul className="game__tag-list">
            {tags}
          </ul>
        </li>
      </ul>
      {controls && (editButton || removeButton) && (
        <section className="game__buttons">
          <Link
            className={editButton ? '' : 'game__buttons--hidden'}
            to={`/games/${game.id}/edit`}
          >
            <Button game secondary label="Edit" />
          </Link>
          <Button
            game
            hidden={!removeButton}
            primary
            onClick={() => dispatch(removeGameFromShelf(game))}
            label="Remove"
          />
        </section>
      )}
    </li>
  );
};

Game.defaultProps = {
  controls: false,
  editButton: true,
  removeButton: true,
  game: {},
};

export default connect()(Game);
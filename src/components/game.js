import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteGame } from '../actions/games';

import Button from './button';

export function Game(props) {
  const game = props.game;
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
      <section className="game__buttons">
        <Link to={`/games/${game.id}/edit`}>
          <Button secondary label="Edit" />
        </Link>
        <Button
          primary
          onClick={() => props.dispatch(deleteGame(game))}
          label="Remove"
        />
      </section>
    </li>
  );
}

export default connect()(Game);
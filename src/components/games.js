import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGames, deleteGame } from '../actions/games';
import '../styles/games.css';

import Button from './button';
import GamesSearchFrom from './games-search-form';

export class Games extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchGames());
  }

  renderGames() {
    let body;

    if (this.props.error) {
      body = (
        <div className="message message-error">{this.props.error.message}</div>
      );
    } else if (this.props.loading) {
      body = (
        <div className="message message-default">Loading users...</div>
      );
    } else {
      let games;
      if (this.props.games.length === 0) {
        games = (
          <div className="games__no-games">
            <p>You don't have any games at the moment. Let's add one now.</p>
            <Link to="/games/add">
              <Button primary label="Add a game" />
            </Link>
          </div>
        );
      } else {
        games = this.props.games.map(game => {
          const tags = game.tags.map(tag => (<li key={tag.id} id={tag.id}>{tag.name}</li>));
          return (
            <li className="game" key={game.id} id={game.id}>
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
                  <Button label="Edit" />
                </Link>
                <Button
                  onClick={() => this.props.dispatch(deleteGame(game))}
                  label="Remove"
                />
              </section>
            </li>
          );
        });
      }
      body = (
        <section className="games">
          <h2>Your Games</h2>
          <ul className="games__list">
            {games}
          </ul>
        </section>
      );
    }
    return body;
  }

  render() {
    return (
      <section className="games__wrapper">
        <header className="games-header">
          <Link to="/games/add" className="centered"><Button primary label="Add a game" /></Link>
          <GamesSearchFrom />
        </header>
        {this.renderGames()}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games.games,
  loading: state.games.loading,
  error: state.games.error
});

export default connect(mapStateToProps)(Games);
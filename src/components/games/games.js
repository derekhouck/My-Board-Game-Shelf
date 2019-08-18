import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './games.css';

import Button from '../button';
import GamesSearchForm from './games-search-form';
import Game from './game';

export class Games extends React.Component {
  filterGames(games = []) {
    if (games.length === 0) { return games }
    const { filters } = this.props;
    const re = new RegExp(filters.title, 'i');
    const titleTest = game => filters.title ? re.test(game.title) : true;
    const playersTest = game =>
      filters.players ? (game.players.min <= filters.players && game.players.max >= filters.players) : true;
    const tagIdTest = game =>
      !filters.tagId ? true : filters.tagId === 'null' ? true : (game.tags.filter(tag => tag.id === filters.tagId).length > 0);

    return games.filter(game => titleTest(game) && playersTest(game) && tagIdTest(game));
  }

  renderGames() {
    const {
      controls,
      editButton,
      error,
      games,
    } = this.props;
    let body;

    if (error) {
      body = (
        <div className="message message-error">{error.message}</div>
      );
    } else {
      let gameElements;
      const filteredGames = this.filterGames(games);
      if (filteredGames.length === 0) {
        gameElements = (
          <div className="games__no-games">
            <p>You don't have any games at the moment. Let's add one now.</p>
            <Link to="/games/add">
              <Button primary label="Add a game" />
            </Link>
          </div>
        );
      } else {
        gameElements = filteredGames.map(game =>
          <Game
            controls={controls}
            editButton={editButton}
            game={game}
            key={game.id}
            removeButton={this.isUserGame(game)}
          />
        );
      }
      body = (
        <section className="games">
          <ul className="games__list">
            {gameElements}
          </ul>
        </section>
      );
    }
    return body;
  }

  isUserGame(game) {
    const { userGames } = this.props;
    return !!userGames.filter(userGame => userGame.id === game.id).length
  }

  render() {
    const { games } = this.props;
    return (
      <section className="games__wrapper">
        <header className="games-header">
          <Link to="/games/add" className="centered"><Button primary label="Add a game" /></Link>
          <GamesSearchForm games={games} />
        </header>
        {this.renderGames()}
      </section>
    );
  }
}

Games.defaultProps = {
  controls: false,
  editButton: true,
  games: [],
  userGames: [],
};

const mapStateToProps = state => ({
  error: state.users.error,
  filters: state.games.filters,
});

export default connect(mapStateToProps)(Games);
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetFilters } from '../../actions/games';
import './games.css';

import Button from '../button';
import GamesSearchForm from './games-search-form';
import Game from './game';

export class Games extends React.Component {
  createGameElements(games = []) {
    const { controls, dispatch, filters } = this.props;
    const anyFilters = !!Object.keys(filters).length;
    return games.length === 0
      ? <div className="games__no-games">
        <p>
          {anyFilters ? 'No games match these filters.' : 'You don\'t have any games at the moment. Let\'s add one now.'}
        </p>
        {anyFilters &&
          <Button secondary label="Clear filters" type="reset" onClick={() => dispatch(resetFilters())} />}
      </div>
      : games.map(game =>
        <Game
          controls={controls}
          game={game}
          key={game.id}
          removeButton={this.isUserGame(game)}
        />
      );
  }

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

  isUserGame(game) {
    const { userGames } = this.props;
    return !!userGames.filter(userGame => userGame.id === game.id).length
  }

  renderGames() {
    const {
      error,
      games,
    } = this.props;
    let body;

    if (error) {
      body = (
        <div className="message message-error">{error.message}</div>
      );
    } else {
      const filteredGames = this.filterGames(games);
      body = (
        <div className="games">
          <ul className="games__list">
            {this.createGameElements(filteredGames)}
          </ul>
        </div>
      );
    }
    return <section className="games__games-list">{body}</section>;
  }

  render() {
    const { children, games } = this.props;
    return (
      <section className="games__wrapper">
        <div className="games__children">
          {children}
        </div>
        <header className="games-header">
          <GamesSearchForm games={games} />
        </header>
        {this.renderGames()}
      </section>
    );
  }
}

Games.defaultProps = {
  controls: false,
  games: [],
  userGames: [],
};

const mapStateToProps = state => ({
  error: state.users.error,
  filters: state.games.filters,
});

export default connect(mapStateToProps)(Games);
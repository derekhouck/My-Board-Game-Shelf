import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetFilters } from '../../actions/games';
import './games.css';

import Button from '../button';
import GameList from './game-list';
import GamesSearchForm from './games-search-form';
import StatusIndicator from '../atoms/status-indicator';

export class Games extends React.Component {
  addIsUserGameAttr(games = []) {
    const { userGames } = this.props;
    return games.map(game => {
      userGames.find(userGame => userGame.id === game.id)
        ? game.isUserGame = true
        : game.isUserGame = false;
      return game;
    });
  }

  filterGames(games = []) {
    if (games.length === 0) { return games }
    const { filters } = this.props;
    const re = new RegExp(filters.title, 'i');
    const mechanicsTest = game => filters.mechanics ? tagIdTest(game, filters.mechanics) : true;
    const playersTest = game =>
      filters.players ? (game.players.min <= filters.players && game.players.max >= filters.players) : true;
    const themesTest = game => filters.themes ? tagIdTest(game, filters.themes) : true;
    const titleTest = game => filters.title ? re.test(game.title) : true;
    const tagIdTest = (game, tagId) =>
      tagId === 'null' ? true : (game.tags.filter(tag => tag.id === tagId).length > 0);

    return games.filter(game => mechanicsTest(game) && playersTest(game) && themesTest(game) && titleTest(game));
  }

  renderGames() {
    const {
      controls,
      dispatch,
      filters,
      games,
      noGamesText,
      submitGamesButton
    } = this.props;
    let body;

    const filteredGames = this.filterGames(games);
    if (filteredGames.length === 0) {
      const anyFilters = !!Object.keys(filters).length;
      body = (<div className="games__no-games">
        <p>
          {anyFilters ? 'No games match these filters.' : noGamesText}
        </p>
        {anyFilters &&
          <Button secondary label="Clear filters" type="reset" onClick={() => dispatch(resetFilters())} />}
        {submitGamesButton &&
          <div>
            <p>Can't find a game you're looking for? Add it to our collection below.</p>
            <Link to='/games/add'><Button label="Submit Game" /></Link>
          </div>
        }
      </div>)
    } else {
      const finalGames = this.addIsUserGameAttr(filteredGames);
      body = <GameList controls={controls} games={finalGames} />;
    }
    return <section className="games__games-list">{body}</section>;
  }

  render() {
    const { children, error, games } = this.props;
    return (
      <section className="games__wrapper">
        {error && <StatusIndicator color="red">{`${error.status} ${error.name}: ${error.message}`}</StatusIndicator>}
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
  noGamesText: 'There are no games to list.',
  submitGamesButton: false,
  userGames: [],
};

const mapStateToProps = state => ({
  error: state.users.error,
  filters: state.games.filters,
});

export default connect(mapStateToProps)(Games);
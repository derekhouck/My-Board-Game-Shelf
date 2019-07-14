import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserGames } from '../../actions/users';
import './games.css';

import Button from '../button';
import GamesSearchFrom from './games-search-form';
import Game from './game';

export class Games extends React.Component {
  componentDidMount() {
    const { currentUser, dispatch } = this.props;
    dispatch(fetchUserGames(currentUser.id));
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

  renderGames() {
    let body;

    if (this.props.error) {
      body = (
        <div className="message message-error">{this.props.error.message}</div>
      );
    } else if (this.props.loading) {
      body = (
        <div className="message message-default">Loading your games...</div>
      );
    } else {
      let games;
      const filteredGames = this.filterGames(this.props.games);
      if (filteredGames.length === 0) {
        games = (
          <div className="games__no-games">
            <p>You don't have any games at the moment. Let's add one now.</p>
            <Link to="/games/add">
              <Button primary label="Add a game" />
            </Link>
          </div>
        );
      } else {
        games = filteredGames.map(game => <Game key={game.id} game={game} />);
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
  currentUser: state.auth.currentUser,
  error: state.users.error,
  games: state.users.games,
  filters: state.games.filters,
  loading: state.loading.loading,
});

export default connect(mapStateToProps)(Games);
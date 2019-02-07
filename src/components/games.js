import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchGames } from '../actions/games';
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
      const games = this.props.games.map(game => (
        <li className="game" key={game.id} id={game.id}>
          <h3 className="game__title">{game.title}</h3>
          <ul>
            <li>Players: {game.players.min} - {game.players.max}</li>
            <li><Link to={`/games/${game.id}/edit`}>Edit</Link></li>
          </ul>
        </li>
      ));
      body = (
        <section className="games">
          <GamesSearchFrom />
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
      <section>
        <h2>Your Games</h2>
        <Link to="/games/add">Add a game</Link>
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
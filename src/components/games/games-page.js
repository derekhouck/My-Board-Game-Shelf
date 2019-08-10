import React from 'react';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions/games';
import Games from './games';

export class GamesPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGames());
  }

  render() {
    const { games, loggedIn } = this.props;
    return (
      <section className="games-page">
        <h1>Games</h1>
        <Games
          controls={loggedIn}
          editButton={false}
          games={games}
        />
      </section>
    );
  }
};

const mapStateToProps = state => ({
  games: state.games.games,
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(GamesPage);
import React from 'react';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions/games';
import { fetchUserGames } from '../../actions/users';
import Games from './games';
import Loading from '../loading';

export class GamesPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGames());
  }

  componentDidUpdate(prevProps) {
    const { currentUser, dispatch } = this.props;
    if (!prevProps.loggedIn && this.props.loggedIn) {
      dispatch(fetchUserGames(currentUser.id))
    }
  }

  render() {
    const { games, loading, loggedIn, userGames } = this.props;
    return (
      <section className="games-page">
        <h1>Games</h1>
        <Games
          controls={loggedIn}
          editButton={false}
          games={games}
          userGames={userGames}
        />
        {loading && <Loading />}
      </section>
    );
  }
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  games: state.games.games,
  loading: state.loading.loading,
  loggedIn: state.auth.currentUser !== null,
  userGames: state.users.games,
});

export default connect(mapStateToProps)(GamesPage);
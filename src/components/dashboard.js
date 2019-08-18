import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchUserGames } from '../actions/users';

import Games from './games/games';
import Loading from './loading';

export class Dashboard extends React.Component {
  componentDidMount() {
    const { currentUser, dispatch } = this.props;
    dispatch(fetchUserGames(currentUser.id));
  }

  render() {
    const { games, loading } = this.props;
    return (
      <section className="dashboard">
        <h1>Your Shelf</h1>
        <Games
          controls
          games={games}
          userGames={games}
        />
        {loading && <Loading />}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  games: state.users.games,
  loading: state.loading.loading,
});

export default connect(mapStateToProps)(requiresLogin()(Dashboard));
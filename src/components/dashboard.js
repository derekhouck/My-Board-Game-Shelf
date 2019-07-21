import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchUserGames } from '../actions/users';

import Games from './games/games';

export class Dashboard extends React.Component {
  componentDidMount() {
    const { currentUser, dispatch } = this.props;
    dispatch(fetchUserGames(currentUser.id));
  }

  render() {
    const { games } = this.props;
    return (
      <section className="dashboard">
        <h1>Your Shelf</h1>
        <Games controls games={games} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  games: state.users.games,
});

export default connect(mapStateToProps)(requiresLogin()(Dashboard));
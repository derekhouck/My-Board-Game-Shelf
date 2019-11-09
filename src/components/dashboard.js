import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './helpers/requires-login';
import { fetchUserGames } from '../actions/users';

import Button from './atoms/button';
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
          noGamesText="You don't have any games at the moment. Let's add some."
          userGames={games}
        >
          <Link to="/games">
            <Button
              centered
              className="btn--add"
              label="Add games"
            />
          </Link>
        </Games>
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
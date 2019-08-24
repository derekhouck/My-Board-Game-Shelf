import React from 'react';
import requiresLogin from '../requires-login';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { deleteGame, fetchGames } from '../../actions/games';

import Button from '../button';
import Loading from '../loading';
import Table from '../table';

export class AdminGames extends React.Component {
  state = {
    isLoading: false
  }

  componentDidMount() {
    const { dispatch, isAdmin } = this.props;
    if (isAdmin) {
      this.setState({ isLoading: true });
      dispatch(fetchGames()).then(() => this.setState({ isLoading: false }));
    }
  }

  handleDeleteButtonBlick(game) {
    const { dispatch } = this.props;
    this.setState({ isLoading: true });
    dispatch(deleteGame(game)).then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { games, isAdmin } = this.props;
    const { isLoading } = this.state;

    const gamesTable = (
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game.id}>
              <td>{game.title}</td>
              <td className="btn-group">
                <Link to={`/games/${game.id}/edit`}>
                  <Button label='Edit' small />
                </Link>
                <Button
                  className='btn--remove'
                  label='Delete'
                  onClick={() => this.handleDeleteButtonBlick(game)}
                  small
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );

    return isAdmin
      ? (
        <section>
          <h2>Games</h2>
          {isLoading ? <Loading /> : gamesTable}
        </section>
      )
      : <Redirect to="/" />;
  }
}

AdminGames.defaultProps = {
  games: [],
  isAdmin: false,
};

const mapStateToProps = state => ({
  games: state.games.games,
  isAdmin: state.auth.currentUser.admin,
});

export default requiresLogin()(connect(mapStateToProps)(AdminGames));
import React from 'react';
import { requiresAdmin } from '../../helpers/requiresAdmin';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAdminGames } from '../../../actions/admin';
import { deleteGame } from '../../../actions/games';

import Button from '../../button';
import Loading from '../../loading';
import StatusIndicator from '../../atoms/status-indicator';
import Table from '../../table';

export class AdminGames extends React.Component {
  state = {
    filters: {
      status: ''
    },
    isLoading: false
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAdminGames());
  }

  handleDeleteButtonBlick(game) {
    const { dispatch } = this.props;
    this.setState({ isLoading: true });
    dispatch(deleteGame(game)).then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { error, games, loading } = this.props;
    const { filters, isLoading } = this.state;
    const addColor = status =>
      status === 'approved'
        ? 'green'
        : status === 'rejected'
          ? 'red'
          : 'yellow';
    const filteredGames = filters.status
      ? games.filter(game => game.status === filters.status)
      : games;

    const gamesTable = (
      <Table headings={['Title', 'Status', 'Actions']}>
        <tbody>
          {filteredGames.map(game => (
            <tr key={game.id}>
              <td>{game.title}</td>
              <td>
                <StatusIndicator
                  color={addColor(game.status)}
                >
                  {game.status}
                </StatusIndicator>
              </td>
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

    return (
      <section>
        <h2>Games</h2>
        {error && <StatusIndicator color="red">{`${error.status} ${error.name}: ${error.message}`}</StatusIndicator>}
        <div>
          Status:
            <select onChange={e => this.setState({ filters: { status: e.target.value } })}>
            <option value="">any</option>
            <option>pending</option>
            <option>approved</option>
            <option>rejected</option>
          </select>
        </div>
        {isLoading || loading ? <Loading /> : gamesTable}
      </section>
    );
  }
}

AdminGames.defaultProps = {
  error: null,
  games: [],
  loading: false,
};

const mapStateToProps = state => ({
  error: state.admin.error,
  games: state.admin.games,
  loading: state.admin.loading,
});

export default requiresAdmin()(connect(mapStateToProps)(AdminGames));
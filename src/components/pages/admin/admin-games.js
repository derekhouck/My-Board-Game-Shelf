import React from 'react';
import { requiresAdmin } from '../../helpers/requiresAdmin';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAdminGames } from '../../../actions/admin';
import { deleteGame } from '../../../actions/games';

import Button from '../../atoms/button';
import Loading from '../../atoms/loading';
import StatusIndicator from '../../atoms/status-indicator';
import Table from '../../table';
import { TableFilters } from '../../molecules/table-filters';

export class AdminGames extends React.Component {
  state = {
    filters: {
      name: '',
      status: ''
    },
    isLoading: false
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAdminGames());
  }

  filterGames() {
    const { games } = this.props;
    const { filters } = this.state;
    const re = new RegExp(filters.name, 'i');
    const nameTest = game =>
      filters.name ?
        re.test(game.title) :
        true;
    const statusTest = game =>
      filters.status ?
        game.status === filters.status :
        true;
    return games.filter(game => nameTest(game) && statusTest(game));
  }

  handleDeleteButtonBlick(game) {
    const { dispatch } = this.props;
    this.setState({ isLoading: true });
    dispatch(deleteGame(game)).then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { error, loading } = this.props;
    const { isLoading } = this.state;
    const addColor = status =>
      status === 'approved'
        ? 'green'
        : status === 'rejected'
          ? 'red'
          : 'yellow';
    const filteredGames = this.filterGames();

    const gamesTable = (
      <Table headings={['Title', 'Status', 'Shelves', 'Actions']}>
        <tbody>
          {filteredGames.map(game => (
            <tr key={game.id}>
              <td>
                <Link to={`/games/${game.id}`}>
                  {game.title}
                </Link>
              </td>
              <td>
                <StatusIndicator
                  color={addColor(game.status)}
                >
                  {game.status}
                </StatusIndicator>
              </td>
              <td>
                {game.shelves ? game.shelves.length : '0'}
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
        <TableFilters
          onSubmit={filters => this.setState({ filters: filters })}
        />
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
import React from 'react';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions/games';

import Loading from '../loading';
import Table from '../table';

export class AdminGames extends React.Component {
  state = {
    isLoading: false
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({ isLoading: true });
    dispatch(fetchGames()).then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { games } = this.props;
    const { isLoading } = this.state;

    const gamesTable = (
      <Table>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game.id}>
              <td>{game.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );

    return (
      <section>
        <h2>Games</h2>
        {isLoading ? <Loading /> : gamesTable}
      </section>
    );
  }
}

AdminGames.defaultProps = {
  games: [],
};

const mapStateToProps = state => ({
  games: state.games.games
});

export default connect(mapStateToProps)(AdminGames);
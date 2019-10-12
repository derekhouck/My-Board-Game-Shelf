import React, { Component } from 'react';
import Table from '../../table';
import requiresLogin from '../../requires-login';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchTags } from '../../../actions/games';
import Loading from '../../loading';
import StatusIndicator from '../../atoms/status-indicator';

export class AdminTags extends Component {
  componentDidMount() {
    const { dispatch, isAdmin } = this.props;
    if (isAdmin) { dispatch(fetchTags()) }
  }

  render() {
    const { error, isAdmin, loading, tags } = this.props;
    return isAdmin
      ? (
        <section>
          <h2>Tags</h2>
          {error && <StatusIndicator color="red">{`${error.status} ${error.name}: ${error.message}`}</StatusIndicator>}
          {loading ? <Loading /> :
            <Table headings={['Name', 'Category']}>
              <tbody>
                {tags.map(tag =>
                  <tr key={tag.id}>
                    <td>{tag.name}</td>
                    <td>{tag.category}</td>
                  </tr>)}
              </tbody>
            </Table>
          }
        </section >
      )
      : <Redirect to="/" />;
  }
};

AdminTags.defaultProps = {
  error: null,
  isAdmin: false,
  loading: false,
  tags: []
};

const mapStateToProps = state => ({
  error: state.games.error,
  isAdmin: state.auth.currentUser.admin,
  loading: state.loading.loading,
  tags: state.games.tags,
});

export default requiresLogin()(connect(mapStateToProps)(AdminTags));
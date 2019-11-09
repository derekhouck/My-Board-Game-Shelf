import React, { Component } from 'react';
import Table from '../../table';
import { requiresAdmin } from '../../helpers/requiresAdmin';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTags } from '../../../actions/games';
import Loading from '../../loading';
import StatusIndicator from '../../atoms/status-indicator';
import Button from '../../atoms/button';

export class AdminTags extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTags());
  }

  render() {
    const { error, loading, tags } = this.props;
    return (
      <section>
        <h2>Tags</h2>
        {error && <StatusIndicator color="red">{`${error.status} ${error.name}: ${error.message}`}</StatusIndicator>}
        {loading ? <Loading /> :
          <section>
            <Link to="/admin/tags/add">
              <Button className="btn--add" label="Add tag" />
            </Link>
            <Table headings={['Name', 'Category', 'Actions']}>
              <tbody>
                {tags.map(tag =>
                  <tr key={tag.id}>
                    <td>{tag.name}</td>
                    <td>{tag.category}</td>
                    <td>
                      <Link to={`/admin/tags/${tag.id}/edit`}>
                        <Button label="Edit" small />
                      </Link>
                    </td>
                  </tr>)}
              </tbody>
            </Table>
          </section>
        }
      </section >
    );
  }
};

AdminTags.defaultProps = {
  error: null,
  loading: false,
  tags: []
};

const mapStateToProps = state => ({
  error: state.games.error,
  loading: state.loading.loading,
  tags: state.games.tags,
});

export default requiresAdmin()(connect(mapStateToProps)(AdminTags));
import React, { Component } from 'react';
import { requiresAdmin } from '../../helpers/requiresAdmin';
import { focus, reduxForm, Field } from 'redux-form';
import Input from '../../atoms/input';
import { required, nonEmpty } from '../../../validators';
import Select from '../../select';
import Button from '../../button';
import { connect } from 'react-redux';
import { fetchTag, editTag } from '../../../actions/tags';
import Loading from '../../loading';
import StatusIndicator from '../../atoms/status-indicator';

export class AdminTagForm extends Component {
  state = {
    loading: false,
    tagId: this.props.match.params.id,
  }

  categories = [
    {
      text: 'Mechanics',
      value: 'Mechanics',
    },
    {
      text: 'Themes',
      value: 'Themes'
    }
  ];

  handleInitialize(tag) {
    const { initialize } = this.props;
    if (tag) {
      const initData = {
        name: tag.name,
        category: tag.category,
      };
      initialize(initData);
    }
  }

  onSubmit(values) {
    const { dispatch, history } = this.props;
    const { tagId } = this.state;
    const { name, category } = values;
    const updatedTag = {
      category,
      id: tagId,
      name,
    };
    return dispatch(editTag(updatedTag)).then(() => history.push('/admin/tags'));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { tagId } = this.state;
    this.setState({ loading: true });
    dispatch(fetchTag(tagId)).then(tag => {
      this.setState({ loading: false })
      this.handleInitialize(tag);
    });
  }

  render() {
    const { fetchError, handleSubmit } = this.props;
    const { loading } = this.state;

    return (
      <section>
        {fetchError && <StatusIndicator color="red">{`${fetchError.status} ${fetchError.name}: ${fetchError.message}`}</StatusIndicator>}
        {loading ? <Loading /> : (
          <form onSubmit={handleSubmit(values => this.onSubmit(values))}>
            <fieldset>
              <legend>Edit Tag</legend>
              <Field
                component={Input}
                type="text"
                name="name"
                id="name"
                label="Tag name"
                validate={[required, nonEmpty]}
              />
              <Field
                component={Select}
                id="category"
                options={this.categories}
                name="category"
                noSelectionLabel="Choose a category"
                validate={required}
              />
            </fieldset>
            <div>
              <Button primary type="submit" label="Edit Tag" />
            </div>
          </form>
        )}
      </section>);
  }
}

const mapStateToProps = state => ({
  fetchError: state.tags.error,
});

export default reduxForm({
  form: "tag-form",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("tag-form", Object.keys(errors)[0]))
})(connect(mapStateToProps)(requiresAdmin()(AdminTagForm)));
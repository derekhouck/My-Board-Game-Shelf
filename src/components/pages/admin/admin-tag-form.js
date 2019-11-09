import React, { Component } from 'react';
import { requiresAdmin } from '../../helpers/requiresAdmin';
import { focus, reduxForm, Field } from 'redux-form';
import Input from '../../atoms/input';
import { required, nonEmpty } from '../../../validators';
import Select from '../../select';
import Button from '../../atoms/button';
import { connect } from 'react-redux';
import { fetchTag, editTag, addTag } from '../../../actions/tags';
import Loading from '../../atoms/loading';
import StatusIndicator from '../../atoms/status-indicator';

export class AdminTagForm extends Component {
  state = {
    editing: !!this.props.match.params.id,
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
    const { editing, tagId } = this.state;
    const { name, category } = values;
    const tagValues = {
      category,
      name,
    };
    const whichAction = tagObject => editing ? editTag(tagObject) : addTag(tagObject);
    if (editing) {
      tagValues.id = tagId;
    }
    return dispatch(whichAction(tagValues)).then(() => history.push('/admin/tags'));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { tagId } = this.state;
    if (tagId) {
      this.setState({ loading: true });
      dispatch(fetchTag(tagId)).then(tag => {
        this.setState({ loading: false })
        this.handleInitialize(tag);
      });
    }
  }

  render() {
    const { fetchError, handleSubmit } = this.props;
    const { editing, loading } = this.state;

    return (
      <section>
        {fetchError && <StatusIndicator color="red">{`${fetchError.status} ${fetchError.name}: ${fetchError.message}`}</StatusIndicator>}
        {loading ? <Loading /> : (
          <form onSubmit={handleSubmit(values => this.onSubmit(values))}>
            <fieldset>
              <legend>{editing ? 'Edit' : 'Add'} Tag</legend>
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
              <Button primary type="submit" label={`${editing ? 'Edit' : 'Add'} Tag`} />
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
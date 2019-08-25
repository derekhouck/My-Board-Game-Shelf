import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';
import { filterGames, resetFilters } from '../../actions/games';
import './games-search-form.css';

import Button from '../button';
import Input from '../input';
import Select from '../select';

export class GamesSearchForm extends React.Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    return dispatch(resetFilters());
  }
  onSubmit(values) {
    const { searchTerm, players, tag } = values;
    const filters = {
      title: searchTerm,
      players,
      tagId: tag
    };
    return this.props.dispatch(filterGames(filters));
  }

  render() {
    const { dispatch, handleSubmit, initialValues, tags } = this.props;
    const mappedTags = tags.map(tag => ({ value: tag.id, text: tag.name }));

    return (
      <section className="games__search">
        <form
          className="games__search-form"
          onSubmit={handleSubmit(values => this.onSubmit(values))}
        >
          <fieldset className="games__search-fields">
            <legend>Filter your games</legend>
            <Field
              component={Input}
              name="searchTerm"
              id="searchTerm"
              label="Game title"
              className="games__search-title"
              placeholder={initialValues.title}
              type="text"
            />
            <Field
              component={Input}
              name="players"
              id="players"
              label="Number of players"
              placeholder={initialValues.players}
              type="number"
            />
            <div className="form-input games__search-tags">
              <label htmlFor="tag">Tag</label>
              <Field
                component={Select}
                id="tag"
                name="tag"
                noSelectionLabel='Select a tag'
                options={mappedTags}
                initialValue={initialValues.tagId}
              />
            </div>
          </fieldset>
          <div className="games__search-buttons">
            <Button label="Search" type="submit" />
            <Button secondary label="Clear filters" type="reset" onClick={() => dispatch(resetFilters())} />
          </div>
        </form>
      </section>
    );
  }
}

GamesSearchForm.defaultProps = {
  initialValues: {}
};

function getUnique(arr, comp) {

  const unique = arr
    .map(e => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);

  return unique;
}

const getTags = (games) => {
  const tagArrays = games.map(game => game.tags);
  const mergedArray = [].concat.apply([], tagArrays);
  const tags = getUnique(mergedArray, 'id');

  return tags;
};

const mapStateToProps = (state, ownProps) => {
  const { games } = ownProps;
  return {
    initialValues: state.games.filters,
    tags: getTags(games)
  }
};

export default connect(mapStateToProps)(
  reduxForm({
    enableReinitialize: true,
    form: 'games-search-form',
    onSubmitFail: (errors, dispatch) => dispatch(focus('registration', Object.keys(errors)[0]))
  })(GamesSearchForm)
);
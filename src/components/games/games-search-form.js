import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';
import { filterGames, resetFilters } from '../../actions/games';
import './games-search-form.css';

import Button from '../atoms/button';
import Input from '../atoms/input';
import Select from '../select';
import { separateTags } from '../helpers';

export class GamesSearchForm extends React.Component {
  state = {
    mechanics: [],
    themes: []
  };

  componentDidUpdate(prevProps) {
    const { tags } = this.props;
    if (prevProps.tags !== tags) {
      const tagsObj = separateTags(tags);
      this.setState({
        mechanics: tagsObj.mechanics,
        themes: tagsObj.themes,
      })
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    return dispatch(resetFilters());
  }
  onSubmit(values) {
    const { mechanics, players, searchTerm, themes } = values;
    const filters = {
      title: searchTerm,
      mechanics,
      players,
      tagId: mechanics && mechanics !== 'null' ? mechanics : themes,
      themes,
    };
    return this.props.dispatch(filterGames(filters));
  }

  render() {
    const { dispatch, handleSubmit, initialValues } = this.props;
    const { mechanics, themes } = this.state;

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
            <div className="form-input games__search-mechanics">
              <label htmlFor="mechanics">Mechanics</label>
              <Field
                component={Select}
                id="mechanics"
                initialValue={initialValues.mechanics}
                name="mechanics"
                noSelectionLabel='Select a mechanic'
                options={
                  mechanics.map(mechanic => ({ value: mechanic.id, text: mechanic.name }))
                }
              />
            </div>
            <div className="form-input games__search-themes">
              <label htmlFor="themes">Themes</label>
              <Field
                component={Select}
                id="themes"
                initialValue={initialValues.themes}
                name="themes"
                noSelectionLabel='Select a theme'
                options={
                  themes.map(theme => ({ value: theme.id, text: theme.name }))
                }
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
    onSubmitFail: (errors, dispatch) => dispatch(focus('games-search-form', Object.keys(errors)[0]))
  })(GamesSearchForm)
);
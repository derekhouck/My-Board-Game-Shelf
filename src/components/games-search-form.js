import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';
import { fetchGames } from '../actions/games';
import '../styles/games-search-form.css';

import Button from './button';
import Input from './input';
import RenderSelectInput from './render-select-input';

export class GamesSearchForm extends React.Component {
  onSubmit(values) {
    const { tagId } = values;
    if (tagId) {
      values.tagId = tagId.value;
    }
    return this.props.dispatch(fetchGames(values));
  }

  render() {
    const tags = this.props.tags.map(tag => ({ value: tag.id, label: tag.name }));
    return (
      <section className="games__search">
        <h2>Filter your games</h2>
        <form
          className="games__search-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <div className="games__search-fields">
            <Field
              component={Input}
              type="text"
              name="searchTerm"
              id="searchTerm"
              label="Game title"
              className="games__search-title"
            />
            <Field
              component={Input}
              type="number"
              name="players"
              id="players"
              label="Number of players"
            />
            <div className="form-input games__search-tags">
              <label htmlFor="tagId">Tag</label>
              <Field
                component={RenderSelectInput}
                name="tagId"
                id="tagId"
                options={tags}
              />
            </div>
          </div>
          <div className="games__search-buttons">
            <Button label="Search" type="submit" />
            <Button secondary label="Clear filters" type="reset" onClick={() => this.props.dispatch(fetchGames())} />
          </div>
        </form>
      </section>
    );
  }
}

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
  const tagArrays = games.games.map(game => game.tags);
  const mergedArray = [].concat.apply([], tagArrays);
  const tags = getUnique(mergedArray, 'id');

  return tags;
};

const mapStateToProps = state => ({
  tags: getTags(state.games)
});

export default reduxForm({
  form: 'games-search-form',
  destroyOnUnmount: false,
  // keepDirtyOnReinitialize: true,
  // enableReinitialize: true,
  onSubmitFail: (errors, dispatch) => dispatch(focus('registration', Object.keys(errors)[0]))
})(connect(mapStateToProps)(GamesSearchForm));
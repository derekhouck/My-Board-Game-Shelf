import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';
import { fetchGames } from '../actions/games';
import '../styles/games-search-form.css';

import Button from './button';
import Input from './input';

export class GamesSearchForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(fetchGames(values));
  }

  render() {
    const tags = this.props.tags.map(tag => (<option key={tag.id} value={tag.id}>{tag.name}</option>));
    return (
      <section className="games__search">
        <h3>Filter your games</h3>
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
            />
            <Field
              component={Input}
              type="number"
              name="players"
              id="players"
              label="Number of players"
            />
            <div className="form-input">
              <label htmlFor="tagId">Tag</label>
              <Field
                component="select"
                name="tagId"
                id="tagId"
              >
                <option value="" defaultValue>Select tag</option>
                {tags}
              </Field>
            </div>
          </div>
          <Button label="Search" type="submit" />
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
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';
import { filterGames, resetFilters } from '../actions/games';
import '../styles/games-search-form.css';

import Button from './button';
import Input from './input';
import Select from './select';

// By default no caret icon is supplied - any valid jsx markup will do
const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
  </svg>
);

export class GamesSearchForm extends React.Component {
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
    const tags = this.props.tags.map(tag => ({ value: tag.id, text: tag.name }));
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
              <label htmlFor="tag">Tag</label>
              <Field
                caretIcon={caretIcon}
                component={Select}
                name="tag"
                id="tag"
                options={tags}
              />
            </div>
          </div>
          <div className="games__search-buttons">
            <Button label="Search" type="submit" />
            <Button secondary label="Clear filters" type="reset" onClick={() => this.props.dispatch(resetFilters())} />
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
  onSubmitFail: (errors, dispatch) => dispatch(focus('registration', Object.keys(errors)[0]))
})(connect(mapStateToProps)(GamesSearchForm));
import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import { fetchGames } from '../actions/games';
import Input from './input';

export class GamesSearchForm extends React.Component {
  onSubmit (values) {
    return this.props.dispatch(fetchGames(values));
  }

  render () {
    return (
      <form 
        className="games__search-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <Field 
          component={Input}
          type="text"
          name="searchTerm"
          id="searchTerm"
          label="Search for game title"
        />
        <Field 
          component={Input}
          type="number"
          name="players"
          id="players"
          label="Number of players"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'games-search-form',
  destroyOnUnmount: false,
  // keepDirtyOnReinitialize: true,
  // enableReinitialize: true,
  onSubmitFail: (errors, dispatch) => dispatch(focus('registration', Object.keys(errors)[0]))
})(GamesSearchForm);
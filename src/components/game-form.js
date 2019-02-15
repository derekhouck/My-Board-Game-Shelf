import React from 'react';
import requiresLogin from './requires-login';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';
import { fetchGames, fetchTags, addGame, editGame } from '../actions/games';
import { required, nonEmpty, minNum, maxNum, notLessThanField } from '../validators';
import './game-form.css';

import Button from './button';
import Input from './input';
import Select from './select';

const playersMin = minNum(1);
const playersMax = maxNum(99);
const notLessThanMinPlayers = notLessThanField('minPlayers');
const multiSelectOptionMarkup = (text) => (
  <div>
    <span className="checkbox">
      <svg className="checkbox-icon" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 488.878 488.878">
        <g><polygon points="143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 144.423,442.58 488.878,98.123 437.055,46.298 " /></g>
      </svg>
    </span>
    <span> {text}</span>
  </div>
);

export class GameForm extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchTags())
      .then(() => {
        if (this.props.editing) {
          if (this.props.games.length === 0) {
            this.props.dispatch(fetchGames())
              .then(() => this.handleInitialize());
          } else {
            this.handleInitialize();
          }
        }
      });
  }

  handleInitialize() {
    const currentGame = this.props.currentGame;
    const initData = {
      "title": currentGame.title,
      "minPlayers": currentGame.players.min,
      "maxPlayers": currentGame.players.max,
      "tags": currentGame.tags.map(tag => tag.id)
    };

    this.props.initialize(initData);
  }

  onSubmit(values) {
    const { title, minPlayers, maxPlayers, tags } = values;
    const game = {
      title,
      minPlayers: Number(minPlayers),
      maxPlayers: Number(maxPlayers),
      tags: (tags[0] === '') ? [] : tags
    };
    const whichAction = (game) => {
      if (this.props.editing) {
        game.id = this.props.match.params.id
        return editGame(game);
      } else {
        return addGame(game);
      }
    };
    return this.props.dispatch(whichAction(game))
      .then(() => (this.props.history.push('/dashboard')));
  }

  render() {
    const sortedTags = this.props.tags.sort((a, b) => a.name.localeCompare(b.name));
    const tagOptions = [{ id: '', name: 'No tags -- this cannot be used after tags have been set' }, ...sortedTags];
    const tags = tagOptions.map(tag => ({
      markup: multiSelectOptionMarkup(tag.name),
      value: tag.id,
      text: tag.name
    }));

    return (
      <form
        className="game-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <h1>{this.props.editing ? 'Edit' : 'Add a'} Game</h1>
        <Field
          component={Input}
          type="text"
          name="title"
          id="title"
          label="Game title"
          validate={[required, nonEmpty]}
        />
        <Field
          component={Input}
          type="number"
          name="minPlayers"
          id="minPlayers"
          label="Minimum number of players"
          validate={[playersMin, playersMax]}
        />
        <Field
          component={Input}
          type="number"
          name="maxPlayers"
          id="maxPlayers"
          label="Maximum number of players"
          validate={[playersMin, playersMax, notLessThanMinPlayers]}
        />
        <div className="form-input">
          <label htmlFor="tags">Tags</label>
          <Field
            component={Select}
            customLabelRenderer={values => values.options.map(value => value.text).join(', ')}
            id="tags"
            multiselect
            name="tags"
            type="select-multiple"
            options={tags}
          />
        </div>
        <div className="form-actions">
          <Button
            primary
            type="submit"
            label={(this.props.editing ? 'Edit' : 'Add') + ' Game'}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => ({
  games: state.games.games,
  tags: state.games.tags,
  currentGame: state.games.games.find(game => game.id === props.match.params.id),
  editing: !!props.match.params.id,
});

export default reduxForm({
  form: 'game-form',
  onSubmitFail: (errors, dispatch) => dispatch(focus('registration', Object.keys(errors)[0]))
})(connect(mapStateToProps)(requiresLogin()(GameForm)));
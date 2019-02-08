import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';
import { fetchGames, fetchTags, addGame, editGame } from '../actions/games';
import Input from './input';
import { required, nonEmpty, minNum, maxNum, notLessThanField } from '../validators';

const playersMin = minNum(1);
const playersMax = maxNum(99);
const notLessThanMinPlayers = notLessThanField('minPlayers');

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
    const game = { title, minPlayers, maxPlayers, tags };
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
    const tags = this.props.tags.map(tag => (<option key={tag.id} value={tag.id}>{tag.name}</option>));

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
            component="select"
            name="tags"
            id="tags"
            multiple
            type="select-multiple"
          >
            {tags}
          </Field>
        </div>
        <button type="submit">{this.props.editing ? 'Edit' : 'Add'} Game</button>
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
})(connect(mapStateToProps)(GameForm));
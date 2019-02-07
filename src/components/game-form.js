import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import Input from './input';
import { required, nonEmpty, minNum, maxNum, notLessThanField } from '../validators';

const playersMin = minNum(1);
const playersMax = maxNum(99);
const notLessThanMinPlayers = notLessThanField('minPlayers');

export class GameForm extends React.Component {
  onSubmit (values) {
    const { title, minPlayers, maxPlayers } = values;
    const game = { title, minPlayers, maxPlayers };
    console.log(game);
  }

  render() {
    return (
      <form
        className="game-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <h1>Add a Game</h1>
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
          validate={[ playersMin, playersMax ]}
        />
        <Field 
          component={Input}
          type="number"
          name="maxPlayers"
          id="maxPlayers"
          label="Maximum number of players"
          validate={[ playersMin, playersMax, notLessThanMinPlayers ]}
        />
        <button type="submit">Add Game</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'game-form',
  onSubmitFail: (errors, dispatch) => dispatch(focus('registration', Object.keys(errors)[0]))
})(GameForm);
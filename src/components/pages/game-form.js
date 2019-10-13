import React from "react";
import requiresLogin from "../helpers/requires-login";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, focus } from "redux-form";
import { fetchAdminGames } from '../../actions/admin';
import { addGame, fetchTags, editGame } from "../../actions/games";
import {
  required,
  nonEmpty,
  minNum,
  maxNum,
  notLessThanField
} from "../../validators";
import "./game-form.css";

import Button from "../button";
import Input from "../atoms/input";
import Select from "../select";

const playersMin = minNum(1);
const playersMax = maxNum(99);
const notLessThanMinPlayers = notLessThanField("minPlayers");
const multiSelectOptionMarkup = text => (
  <div>
    <span className="checkbox">
      <svg
        className="checkbox-icon"
        x="0px"
        y="0px"
        width="12px"
        height="12px"
        viewBox="0 0 488.878 488.878"
      >
        <g>
          <polygon points="143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 144.423,442.58 488.878,98.123 437.055,46.298 " />
        </g>
      </svg>
    </span>
    <span> {text}</span>
  </div>
);

export class GameForm extends React.Component {
  componentDidMount() {
    const { dispatch, editing, isAdmin, games } = this.props;
    dispatch(fetchTags()).then(() => {
      if (editing && isAdmin) {
        games.length === 0
          ? dispatch(fetchAdminGames())
            .then(() => this.handleInitialize())
          : this.handleInitialize();
      }
    });
  }

  handleInitialize() {
    const { currentGame } = this.props;
    const initData = {
      title: currentGame.title,
      minPlayers: currentGame.players.min,
      maxPlayers: currentGame.players.max,
      status: currentGame.status,
      tags: currentGame.tags
    };

    this.props.initialize(initData);
  }

  onSubmit(values) {
    const { dispatch, editing, history, match } = this.props;
    const { title, minPlayers, maxPlayers, status, tags } = values;
    const game = {
      minPlayers: Number(minPlayers),
      maxPlayers: Number(maxPlayers),
      status,
      tags: tags[0] === "" ? [] : tags,
      title,
    };
    const whichAction = game => {
      if (editing) {
        game.id = match.params.id;
        return editGame(game);
      } else {
        return addGame(game);
      }
    };
    return dispatch(whichAction(game))
      .then(() => editing ? history.push('/admin/games') : history.push("/dashboard"));
  }

  getTagOptions(tags) {
    const sortedTags = tags.sort((a, b) => a.name.localeCompare(b.name));
    const tagOptions = [
      {
        id: "",
        name: "No tags -- this cannot be used after tags have been set"
      },
      ...sortedTags
    ];
    const mappedTags = tagOptions.map(tag => ({
      markup: multiSelectOptionMarkup(tag.name),
      value: tag.id,
      text: tag.name
    }));
    return mappedTags;
  }

  renderForm() {
    const { editing, error, handleSubmit, loading } = this.props;
    let form = <div />;

    if (error) {
      form = (
        <div className="message message-error">{error.message}</div>
      );
    } else if (loading) {
      form = (
        <div className="message message-default">Submitting your game...</div>
      );
    } else {
      form = (
        <form
          className="game-form"
          onSubmit={handleSubmit(values => this.onSubmit(values))}
        >
          <fieldset>
            <legend>{editing ? "Edit" : "Add a"} Game</legend>
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
            {editing &&
              <div>
                <label htmlFor="status">Status</label>
                <Field
                  component="select"
                  id="status"
                  name="status"
                >
                  <option value="pending">pending</option>
                  <option value="approved">approved</option>
                  <option value="rejected">rejected</option>
                </Field>
              </div>
            }
            <div className="form-input">
              <label htmlFor="tags">Tags</label>
              <Field
                component={Select}
                customLabelRenderer={values =>
                  values.options.map(value => value.text).join(", ")
                }
                id="tags"
                multiselect
                name="tags"
                type="select-multiple"
                options={this.getTagOptions(this.props.tags)}
              />
            </div>
          </fieldset>
          <div className="form-actions">
            <Button
              primary
              type="submit"
              label={(editing ? "Edit" : "Add") + " Game"}
            />
          </div>
        </form>
      );
    }
    return form;
  }

  render() {
    const { editing, isAdmin } = this.props;
    return !editing || isAdmin ? this.renderForm() : <Redirect to="/" />;
  }
}

GameForm.defaultProps = {
  currentGame: null,
  currentUser: null,
  games: [],
  isAdmin: false,
  tags: [],
}

const mapStateToProps = (state, props) => ({
  games: state.admin.games,
  currentGame: state.admin.games.find(
    game => game.id === props.match.params.id
  ),
  currentUser: state.auth.currentUser,
  editing: !!props.match.params.id,
  isAdmin: state.auth.currentUser
    ? state.auth.currentUser.admin
    : false,
  loading: state.loading.loading,
  tags: state.games.tags,
});

export default reduxForm({
  form: "game-form",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("registration", Object.keys(errors)[0]))
})(connect(mapStateToProps)(requiresLogin()(GameForm)));

import React, { useEffect, useState } from 'react';
import Button from '../button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './game-page.css';
import StatusIndicator from '../atoms/status-indicator';
import Loading from '../loading';
import NotFound from '../404';
import { API_BASE_URL } from '../../config';
import { normalizeResponseErrors } from '../../actions/utils';
import { fetchUserGames, removeGameFromShelf, addGameToShelf } from '../../actions/users';

export const GamePage = (props) => {
  const {
    currentUser,
    dispatch,
    dispatchLoading,
    isAdmin,
    loggedIn,
    match,
    userGames
  } = props;
  const [error, setError] = useState(null);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mechanics, setMechanics] = useState([]);
  const [removeButton, setRemoveButton] = useState(false);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchGame(match.params.id)
      .then(game => {
        setGame(game);
        separateTags(game.tags);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [match.params.id]);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      dispatch(fetchUserGames(currentUser.id))
        .then(() => setLoading(false));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (userGames.length && game) {
      userGames.filter(userGame => userGame.id === game.id).length ?
        setRemoveButton(true) :
        setRemoveButton(false);
    }
  }, [game, userGames]);

  const fetchGame = gameId =>
    fetch(`${API_BASE_URL}/games/${gameId}`)
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json());

  const renderButton = () =>
    removeButton ?
      <Button
        className="btn--remove game-page__btn"
        label="Remove"
        onClick={() => dispatch(removeGameFromShelf(game))}
      /> :
      <Button
        className="btn--add game-page__btn"
        label="Add"
        onClick={() => dispatch(addGameToShelf(game))}
      />;

  const renderPage = () => {
    if (loading || dispatchLoading) {
      return <Loading />;
    } else if (error) {
      return error.status === 404 ?
        <NotFound /> :
        (
          <StatusIndicator color="red">
            {error.status}: {error.message}
          </StatusIndicator>
        );
    } else if (game) {
      return (
        <section>
          <header className="game-page__header">
            <h1>{game.title}</h1>
            {loggedIn && renderButton()}
          </header>
          <div className="game-page__details">
            <h2>Players</h2>
            <div>
              {game.players.min}-{game.players.max}
            </div>
            <h2>Themes</h2>
            <ul>
              {themes.map(theme => <li key={theme.id}>{theme.name}</li>)}
            </ul>
            <h2>Mechanics</h2>
            <ul>
              {mechanics.map(mechanic => <li key={mechanic.id}>{mechanic.name}</li>)}
            </ul>
            {isAdmin &&
              <p>
                <Link to={`/games/${game.id}/edit`}>
                  Edit game
                </Link>
              </p>
            }
          </div>
        </section>
      );
    }
    return <NotFound />;
  }

  const separateTags = tags => {
    const mechanicsArr = [];
    const themesArr = [];
    tags.forEach(tag => {
      switch (tag.category) {
        case 'Mechanics':
          mechanicsArr.push(tag);
          break;
        case 'Themes':
          themesArr.push(tag);
          break;
        default:
          break;
      }
    })
    setMechanics(mechanicsArr);
    setThemes(themesArr);
  };

  return (
    <article className="game-page">
      {renderPage()}
    </article>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  dispatchLoading: state.loading.loading,
  isAdmin: state.auth.currentUser ?
    state.auth.currentUser.admin :
    false,
  loggedIn: state.auth.currentUser !== null,
  userGames: state.users.games,
});

export default connect(mapStateToProps)(GamePage);
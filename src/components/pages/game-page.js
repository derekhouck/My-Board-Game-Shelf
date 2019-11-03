import React, { useEffect, useState } from 'react';
import Button from '../button';
import { connect } from 'react-redux';
import './game-page.css';
import StatusIndicator from '../atoms/status-indicator';
import Loading from '../loading';
import NotFound from '../404';
import { API_BASE_URL } from '../../config';
import { normalizeResponseErrors } from '../../actions/utils';

export const GamePage = (props) => {
  const { loggedIn, match } = props;
  const [error, setError] = useState(null);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mechanics, setMechanics] = useState([]);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/games/${match.params.id}`)
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(game => {
        setGame(game);
        separateTags(game.tags);
        setLoading(false);
      })
      .catch(err => {
        setError(err)
        setLoading(false);
      });
  }, [match.params.id]);

  const renderPage = () => {
    if (loading) {
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
            {loggedIn &&
              <Button
                className="btn--add game-page__btn"
                label="Add"
              />
            }
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
    console.log(mechanicsArr);
    console.log(themesArr);
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
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(GamePage);
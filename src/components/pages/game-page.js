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

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/games/${match.params.id}`)
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(game => {
        setGame(game);
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
              <li>Tag 1</li>
              <li>Tag 2</li>
            </ul>
            <h2>Mechanics</h2>
            <ul>
              <li>Tag 1</li>
              <li>Tag 2</li>
            </ul>
          </div>
        </section>
      );
    }
    return <NotFound />;
  }

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
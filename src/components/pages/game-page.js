import React from 'react';
import Button from '../button';
import './game-page.css';

export const GamePage = (props) => {
  return (
    <article className="game-page">
      <header className="game-page__header">
        <h1>GamePage</h1>
        <Button
          className="btn--add game-page__btn"
          label="Add"
        />
      </header>
      <section className="game-page__details">
        <h2>Players</h2>
        <div>2-8</div>
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
      </section>
    </article>
  );
};

export default GamePage;
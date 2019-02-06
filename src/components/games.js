import React from 'react';

export default class Games extends React.Component {
  renderGames() {
    const gamesData = [
      {
        "players": {
          "min": 5,
          "max": 10
        },
        "tags": [],
        "title": "Game created by Postman",
        "userId": "000000000000000000000001",
        "createdAt": "2019-02-06T19:41:28.366Z",
        "updatedAt": "2019-02-06T19:41:28.366Z",
        "id": "5c5b38683f9c4713d828bf58"
      },
      {
        "players": {
          "min": 2,
          "max": 8
        },
        "tags": [
          "222222222222222222222205",
          "222222222222222222222207"
        ],
        "title": "King of New York",
        "userId": "000000000000000000000001",
        "createdAt": "2019-02-06T19:37:02.780Z",
        "updatedAt": "2019-02-06T19:37:02.780Z",
        "id": "111111111111111111111105"
      },
      {
        "players": {
          "min": 2,
          "max": 8
        },
        "tags": [
          "222222222222222222222201",
          "222222222222222222222203",
          "222222222222222222222205"
        ],
        "title": "King of Tokyo",
        "userId": "000000000000000000000001",
        "createdAt": "2019-02-06T19:37:02.780Z",
        "updatedAt": "2019-02-06T19:37:02.780Z",
        "id": "111111111111111111111107"
      },
      {
        "players": {
          "min": 2,
          "max": 6
        },
        "tags": [],
        "title": "Monopoly",
        "userId": "000000000000000000000001",
        "createdAt": "2019-02-06T19:37:02.780Z",
        "updatedAt": "2019-02-06T19:37:02.780Z",
        "id": "111111111111111111111103"
      },
      {
        "players": {
          "min": null,
          "max": null
        },
        "tags": [],
        "title": "Updated Game",
        "userId": "000000000000000000000001",
        "createdAt": "2019-02-06T19:37:02.780Z",
        "updatedAt": "2019-02-06T19:43:06.639Z",
        "id": "111111111111111111111109"
      }
    ];

    const games = gamesData.map(game => (
        <li className="game" key={game.id} id={game.id}>
          <h3 className="game__title">{game.title}</h3>
          <ul>
            <li>Players: {game.players.min} - {game.players.max}</li>
          </ul>
        </li>
    ));
    return (
      <ul className="games">
        {games}
      </ul>
    );
  }

  render() {
    return (
      <section>
        <h2>Your Games</h2>
        {this.renderGames()}
      </section>
    );
  }
}
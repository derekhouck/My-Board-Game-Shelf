import {
  FETCH_GAMES_REQUEST, fetchGamesRequest,
  FETCH_GAMES_SUCCESS, fetchGamesSuccess,
  FETCH_TAGS_SUCCESS, fetchTagsSuccess,
  FILTER_GAMES, filterGames,
  RESET_FILTERS, resetFilters,
  GAMES_ERROR, gamesError
} from './games';

describe('Games actions', function () {
  describe('fetchGamesRequest', function () {
    it('should return FETCH_GAMES_REQUEST', function () {
      const action = fetchGamesRequest();
      expect(action.type).toEqual(FETCH_GAMES_REQUEST);
    });
  });

  describe('fetchGamesSuccess', function () {
    it('should return FETCH_GAMES_SUCCESS', function () {
      const games = ['example game one', 'example game two'];
      const action = fetchGamesSuccess(games);
      expect(action.type).toEqual(FETCH_GAMES_SUCCESS);
      expect(action.games).toEqual(games);
    });
  });

  describe('fetchTagsSuccess', function () {
    it('should return FETCH_TAGS_SUCCESS', function () {
      const tags = ['tag one', 'tag two'];
      const action = fetchTagsSuccess(tags);
      expect(action.type).toEqual(FETCH_TAGS_SUCCESS);
      expect(action.tags).toEqual(tags);
    });
  });

  describe('filterGames', function () {
    it('should return FILTER_GAMES', function () {
      const filters = 'example filter';
      const action = filterGames(filters);
      expect(action.type).toEqual(FILTER_GAMES);
      expect(action.filters).toEqual(filters);
    });
  });

  describe('resetFilters', function () {
    it('should return RESET_FILTERS', function () {
      const action = resetFilters();
      expect(action.type).toEqual(RESET_FILTERS);
    });
  });

  describe('gamesError', function () {
    it('should return GAMES_ERROR', function () {
      const error = 'sample error';
      const action = gamesError(error);
      expect(action.type).toEqual(GAMES_ERROR);
      expect(action.error).toEqual(error);
    });
  });
});
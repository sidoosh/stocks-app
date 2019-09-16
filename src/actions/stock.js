export const LOAD_PAGE = 'LOAD_STOCKS';
export const INCOMING_STOCKS = 'INCOMING_STOCKS';
export const SELECT_STOCK = 'SELECT_STOCK';
export const SERVER_ERROR = 'SERVER_ERROR';

export const loadPage = () => ({
  type: LOAD_PAGE,
  isLoading: true,
});

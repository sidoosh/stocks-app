import {
  LOAD_PAGE,
  INCOMING_STOCKS,
  SELECT_STOCK,
  SERVER_ERROR,
} from '../actions/index';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  stocks: {},
};

export function stocksReducer(state = initialState, action) {
  switch (action.type) {
    case INCOMING_STOCKS: {
      const stocks = { ...state.stocks };
      const { payload: stocksFromServer } = action;
      const currentTime = Date.now();

      stocksFromServer.forEach(stock => {
        let [stockName, stockPrice] = stock;
        stockPrice = +stockPrice.toFixed(2);

        if (isEmpty(stocks[stockName])) {
          stocks[stockName] = {
            stockPrice,
            stockName,
            stockTrend: [[Date.now(), stockPrice]],
            isSelected: false,
          };
        } else {
          const stockFromState = stocks[stockName];

          stockFromState['changePercent'] = (
            ((+stockPrice - +stockFromState.stockPrice) * 100) /
            +stockFromState.stockPrice
          ).toFixed(2);
          stockFromState.stockPrice = stockPrice;
          stockFromState.stockTrend.push([currentTime, stockPrice]);
        }
      });

      return {
        ...state,
        stocks,
        isLoading: false,
        hasError: false,
      };
    }

    case SELECT_STOCK: {
      let stockName = action.payload;
      const { stocks } = state;
      const stock = stocks[stockName];
      stock.isSelected = !stock.isSelected;

      return {
        ...state,
        stocks,
      };
    }

    case LOAD_PAGE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case SERVER_ERROR: {
      const error = action.payload;
      return {
        ...state,
        hasError: true,
        errorMessage: error,
      };
    }

    default:
      return state;
  }
}

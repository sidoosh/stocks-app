import { take, put, call, all } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { INCOMING_STOCKS, SERVER_ERROR } from '../actions/stock';

function createSocketChannel() {
  return eventChannel(emit => {
    const stockURL = 'ws://stocks.mnet.website';
    const ws = new WebSocket(stockURL);

    const openHandler = () => {
      console.log('opening...');
    };

    const messageHandler = event => {
      const payload = JSON.parse(event.data);
      emit(payload);
    };

    const errorHandler = errorEvent => {
      // create an Error object and put it into the channel
      console.log('Connection error');
      emit(errorEvent);
    };
    // setup the subscription
    ws.addEventListener('error', errorHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('message', messageHandler);

    const unsubscribe = () => {
      const closeHandler = event => {
        if (event.wasClean) {
          console(
            `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`,
          );
        } else {
          // e.g. server process killed or network down
          console.log('[close] Connection died');
        }
      };
      ws.addEventListener('close', closeHandler);
    };

    return unsubscribe;
  });
}

function* watchOnMessages() {
  const socketChannel = yield call(createSocketChannel);

  while (true) {
    try {
      const payload = yield take(socketChannel);
      yield put({ type: INCOMING_STOCKS, payload });
    } catch (err) {
      yield put({ type: SERVER_ERROR, payload: err });
    }
  }
}

export function* rootSaga() {
  yield all([watchOnMessages()]);
}

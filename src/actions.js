import { ajax } from 'rxjs/observable/dom/ajax';

export const GET_DATA_REQUESTED = 'GET_DATA_REQUESTED';
export const GET_DATA_DONE = 'GET_DATA_DONE';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';

export function getDataRequested() {
  return {
    type: 'GET_DATA_REQUESTED'
  };
}

export function getDataDone(data) {
  return {
    type: 'GET_DATA_DONE',
    payload: data
  };
}

export function getDataFailed(error) {
  return {
    type: 'GET_DATA_FAILED',
    payload: error
  };
}

export function getDataEpic(action$) {
  return action$.ofType(GET_DATA_REQUESTED)
    .mergeMap(action =>
      ajax.getJSON('https://api.github.com/users/burczu/repos')
        .map(response => getDataDone(response))
        .catch(error => getDataFailed(error))
    );
}
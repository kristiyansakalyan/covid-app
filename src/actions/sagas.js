import { act } from 'react-dom/test-utils';
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchGlobalData } from '../apis/covidapi';

function* fetchGlobalDataSaga() {
    try {
        const data = yield call(fetchGlobalData);
        yield put({type: 'FETCH_DATA_SUCCESS', payload: data.data});
    } catch(e) {
        yield put({type: 'FETCH_DATA_ERROR', payload: e.message})
    }
}

function* mySaga() {
    yield takeEvery('FETCH_DATA_REQUESTED', fetchGlobalDataSaga);
}

export default mySaga;
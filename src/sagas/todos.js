import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchAllToDos } from '../api/api';
import { todosAllRequested, todosAllFailed, todosAllSuccess } from "../reducers/todoSlice";

function* gatAllToDos() {
    yield put(todosAllRequested());
    const todos = yield call(fetchAllToDos);
    console.log('SAGA', todos);
    if (todos.error) {
        yield put(todosAllFailed(todos.error.message));
    } else {
        yield put(todosAllSuccess(todos.data.body));
    }
}

function* todoSaga() {
    yield takeLatest('TODO_ALL_REQUESTED', gatAllToDos)
}

export default todoSaga;
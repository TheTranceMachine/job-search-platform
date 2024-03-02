import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchAllSavedJobsApi } from '../api/api';
import { savedJobsRequested, savedJobsFailed, savedJobsSuccess } from "../reducers/savedJobsSlice";

function* getAllSavedJobs(action) {
    yield put(savedJobsRequested());
    const jobs = yield call(fetchAllSavedJobsApi, action.payload);
    if (jobs.error) {
        yield put(savedJobsFailed(jobs.error));
    } else {
        yield put(savedJobsSuccess(jobs.body));
    }
}

function* savedJobsSaga() {
    yield takeLatest('SAVED_JOBS_REQUESTED', getAllSavedJobs)
}

export { savedJobsSaga }
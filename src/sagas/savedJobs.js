import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchAllSavedJobs } from '../api/api';
import { savedJobsRequested, savedJobsFailed, savedJobsSuccess } from "../reducers/savedJobs";

function* getAllSavedJobs() {
    yield put(savedJobsRequested());
    const jobs = yield call(fetchAllSavedJobs);
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
import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchAllSavedJobsApi, saveJobApi } from '../api/api';
import {
    savedJobsRequested,
    savedJobsFailed,
    savedJobsSuccess,
    saveJobRequested,
    saveJobFailed,
    saveJobSuccess
} from "../reducers/savedJobsSlice";

function* getAllSavedJobs(action) {
    yield put(savedJobsRequested());
    const jobs = yield call(fetchAllSavedJobsApi, action.payload);
    if (jobs.error) {
        yield put(savedJobsFailed(jobs.error));
    } else {
        yield put(savedJobsSuccess(jobs.data.body));
    }
}

function* savedJobsSaga() {
    yield takeLatest('SAVED_JOBS_REQUESTED', getAllSavedJobs)
}

function* saveJob(action) {
    yield put(saveJobRequested());
    const job = yield call(saveJobApi, action.payload);
    console.log(job);
    if (job.error) {
        yield put(saveJobFailed(job.error));
    } else {
        yield put(saveJobSuccess(job.data.body));
    }
}

function* saveJobSaga() {
    yield takeLatest('SAVE_JOB_REQUESTED', saveJob)
}

export { savedJobsSaga, saveJobSaga }
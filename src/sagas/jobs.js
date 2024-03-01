import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { fetchHackerNewsJob, fetchAllHackerNewsJobs } from '../api/api';
import { jobByIdRequested, jobByIdFailed, jobByIdSuccess } from "../reducers/jobsDetails";
import { jobsAllRequested, jobsAllFailed, jobsAllSuccess } from "../reducers/jobsAllSlice";

function* getJobById(action) {
    yield put(jobByIdRequested());

    const job = yield call(fetchHackerNewsJob, action.payload);
    if (job.error) {
        yield put(jobByIdFailed(job.error));
    } else {
        yield put(jobByIdSuccess(job.data));
    }
}

function* jobByIdSaga() {
    yield takeEvery('JOB_BY_ID_REQUESTED', getJobById)
}

function* getAllJobs() {
    yield put(jobsAllRequested());
    const jobs = yield call(fetchAllHackerNewsJobs);
    if (jobs.error) {
        yield put(jobsAllFailed(jobs.error));
    } else {
        yield put(jobsAllSuccess(jobs.data));
    }
}

function* jobsAllSaga() {
    yield takeLatest('JOB_ALL_REQUESTED', getAllJobs)
}

export { jobByIdSaga, jobsAllSaga }
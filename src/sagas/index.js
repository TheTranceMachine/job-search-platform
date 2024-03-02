import { all } from 'redux-saga/effects';
import { loginSaga, userRegistrationSaga, userLogoutSaga } from './user';
import { jobByIdSaga, jobsAllSaga } from './jobs';
import { savedJobsSaga, saveJobSaga } from './savedJobs';
import todoSaga from './todos';

export default function* rootSaga() {
    yield all([
        loginSaga(),
        userRegistrationSaga(),
        userLogoutSaga(),
        todoSaga(),
        jobsAllSaga(),
        jobByIdSaga(),
        savedJobsSaga(),
        saveJobSaga()
    ])
}
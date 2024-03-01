import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const SavedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'SAVED_JOBS_REQUESTED' });
    }, []);
    return <div>Test</div>;
};

export default SavedJobs;

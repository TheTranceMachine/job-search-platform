import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SavedJobs = () => {
  const dispatch = useDispatch();

  const { preferred_username: username } = useSelector(
    (state) => state.user.user
  );

  useEffect(() => {
    dispatch({ type: 'SAVED_JOBS_REQUESTED', payload: { username } });
  }, []);
  return <div>Test</div>;
};

export default SavedJobs;

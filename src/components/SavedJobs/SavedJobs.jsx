import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobDetails from '../JobDetails/JobDetails';

const SavedJobs = () => {
  const dispatch = useDispatch();

  const { preferred_username: username } = useSelector(
    (state) => state.user.user
  );

  const jobs = useSelector((state) => state.savedJobs.jobs);

  useEffect(() => {
    dispatch({ type: 'SAVED_JOBS_REQUESTED', payload: { username } });
  }, []);

  return (<div className="overflow-y-scroll w-full">
<div className="m-4 border-[#12172e] border bg-[#12172e] rounded-md py-1 shadow">
        <table class="table-auto w-full shadow border-t border-slate-800">
          <thead>
            <tr>
              <th className="bg-[#12172e] p-2 text-sm text-white">Title</th>
              <th className="bg-[#12172e] p-2 text-sm text-white">Author</th>
              <th className="bg-[#12172e] p-2 text-sm text-white">Date & Time</th>
              <th className="bg-[#12172e] p-2 text-sm  text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length && jobs.map((details) => (
              <JobDetails details={details} />
            ))}
          </tbody>
        </table>
      </div>
  </div>);
};

export default SavedJobs;

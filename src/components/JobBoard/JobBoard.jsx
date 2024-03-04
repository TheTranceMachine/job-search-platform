import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JobDetails from '../JobDetails/JobDetails';

const JobBoard = () => {
  const [jobsPaginated, setJobsPaginated] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  
  const jobs = useSelector((state) => state.jobsAll.jobs);
  const error = useSelector((state) => state.jobsAll.error);
  const isLoading = useSelector((state) => state.jobsAll.isLoading);

  const jobsDetails = useSelector((state) => state.jobsDetails.jobsDetails);
  const jobsDetailsError = useSelector((state) => state.jobsDetails.error);
  const jobsDetailsIsLoading = useSelector(
    (state) => state.jobsDetails.isLoading
  );

  // Define the number of items to display per page
  const pageSize = 6;
  // Calculate the total number of pages
  const totalPages = Math.ceil(jobs.length / pageSize);

  const jobDetails = async (id) => {
    return id;
  };

  // Create a function to display a paginated list of items
  const paginate = async (items, pageNumber) => {
    // Start at the beginning of the current page
    const startIndex = (pageNumber - 1) * pageSize;
    // End at the end of the current page
    const endIndex = startIndex + pageSize;

    // Display the items for the current page
    const paginatedItems = items.slice(startIndex, endIndex);

    console.log('paginatedItems: ', paginatedItems);

    // Get details for the paginated IDs
    for (const id of paginatedItems) {
      dispatch({ type: 'JOB_BY_ID_REQUESTED', payload: { id } });
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    paginate(jobs, page + 1);
  };

  useEffect(() => {
    dispatch({ type: 'JOB_ALL_REQUESTED' });
  }, []);

  useEffect(() => {
    if (!jobsPaginated.length && jobs.length) {
      paginate(jobs, 1);
    }
  }, [jobs, jobsPaginated]);

  useEffect(() => {
    if (jobsDetails.length) {
      setJobsPaginated(jobsDetails);
    }
  }, [jobsDetails]);

  return (
    <div className="overflow-y-scroll w-full">
      {/* <div className="mx-6 rounded-t-md translate-y-[1.3rem] text-2xl bg-orange-500 px-4 py-2 text-[#12172e] z-10">
        Hacker News Jobs Board
      </div> */}
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
            {jobsPaginated.map((details) => (
              <JobDetails details={details} />
            ))}
          </tbody>
        </table>
      </div>
      {page < totalPages && (
        <div className="flex gap-2 justify-end items-start -translate-y-[1.4rem] mr-6">
          <button
            onClick={handleLoadMore}
            className="text-[#12172e] px-3 py-2 rounded-b-md shadow bg-orange-500 border border-t-orange-600 border-r-orange-400 border-l-orange-400 border-b-orange-200"
          >
            Load More jobs
          </button>
        </div>
      )}
    </div>
  );
};

export default JobBoard;

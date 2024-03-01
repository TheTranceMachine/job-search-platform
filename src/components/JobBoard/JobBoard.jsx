import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JobDetails from './JobDetails';

const JobBoard = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [jobPostsPaginated, setJobPostsPaginated] = useState([]);
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
  const totalPages = Math.ceil(jobPosts.length / pageSize);

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

    // Get details for the paginated IDs
    for (const id of paginatedItems) {
      dispatch({ type: 'JOB_BY_ID_REQUESTED', payload: { id } });
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    paginate(jobPosts, page + 1);
  };

  useEffect(() => {
    if (jobs.length) {
      setJobPosts(jobs);
    }
  }, [jobs]);

  useEffect(() => {
    if (!jobPostsPaginated.length && jobPosts.length) {
      paginate(jobPosts, 1);
    }
  }, [jobPosts, jobPostsPaginated]);

  useEffect(() => {
    setTimeout(() => setJobPostsPaginated(jobsDetails), 5000);
  }, [jobDetails]);

  return (
    <div className="w-full overflow-y-scroll">
      <h1 className="main_title">Hacker News Jobs Board</h1>
      {jobPostsPaginated.map((details) => (
        <JobDetails details={details} />
      ))}
      {page < totalPages && (
        <button onClick={handleLoadMore} className="loadMoreButton">
          Load More jobs
        </button>
      )}
    </div>
  );
};

export default JobBoard;

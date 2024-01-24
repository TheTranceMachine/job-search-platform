import { useState, useEffect } from 'react';

function JobBoard() {
  const [jobPosts, setJobPosts] = useState([]);
  const [jobPostsPaginated, setJobPostsPaginated] = useState([]);
  const [page, setPage] = useState(1);

  // Define the number of items to display per page
  const pageSize = 6;
  // Calculate the total number of pages
  const totalPages = Math.ceil(jobPosts.length / pageSize);

  const jobDetails = async (id) => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    const details = await response.json();
    return details;
  };

  function unixToDateTime(unixTimestamp) {
    const d = new Date(unixTimestamp * 1000);
    const date = d.toLocaleDateString();
    const time = d.toTimeString().split(' ')[0];
    return `${date}, ${time}`;
  };

  // Create a function to display a paginated list of items
  async function paginate(items, pageNumber) {
    // Start at the beginning of the current page
    const startIndex = (pageNumber - 1) * pageSize;
    // End at the end of the current page
    const endIndex = startIndex + pageSize;

    // Display the items for the current page
    const paginatedItems = items.slice(startIndex, endIndex);

    // Get details for the paginated IDs
    let jobDetailsResults = [];
    for (const id of paginatedItems) {
      const details = await jobDetails(id);
      jobDetailsResults.push(details);
    }
    // Add to the current list of paginated pages
    const newItems = jobPostsPaginated.concat(jobDetailsResults);

    // Return the paginated items
    setJobPostsPaginated(newItems);
  };

  const handleOnClick = () => {
    setPage((prev) => prev + 1);
    paginate(jobPosts, page + 1);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://hacker-news.firebaseio.com/v0/jobstories.json'
      );
      const postings = await response.json();
      setJobPosts(postings);
    };
    if (!jobPosts.length) fetchData();
  }, [jobPosts]);

  useEffect(() => {
    if (!jobPostsPaginated.length && jobPosts.length !== 0) {
      paginate(jobPosts, 1);
    }
  }, [jobPosts, jobPostsPaginated]);

  return (
    <div>
      <h1 className="main_title">Hacker News Jobs Board</h1>
      {jobPostsPaginated.length !== 0 ? (
        <>
          {jobPostsPaginated.map(({ id, title, by, time, url }) => (
            <div className="post" key={id}>
              {url !== null ? (
                <a href={url} target="_blank">
                  {title}
                </a>
              ) : (
                <div>{title}</div>
              )}
              <div>
                By {by} - {unixToDateTime(time)}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>Nothing to display</div>
      )}
      {page < totalPages && (
        <button onClick={handleOnClick} className="loadMoreButton">
          Load More jobs
        </button>
      )}
    </div>
  );
}

export default JobBoard;

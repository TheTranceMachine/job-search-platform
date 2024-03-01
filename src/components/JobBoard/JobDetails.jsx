import { Suspense } from 'react';
import { unixToDateTime } from '../../utils/utils';

const Title = ({ url, title }) => (
  <a href={url ? url : ''} target="_blank">
    <div>{title}</div>
  </a>
);

const JobDetails = ({ details }) => {
  const { id, title, by, time, url } = details;
  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="post" key={id}>
        <Title title={title} url={url} />
        <div>
          By {by} - {unixToDateTime(time)}
        </div>
      </div>
    </Suspense>
  );
};

export default JobDetails;

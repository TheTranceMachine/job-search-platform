import { StarIcon } from '@radix-ui/react-icons';
import { useSelector } from 'react-redux';
import { unixToDateTime } from '../../utils/utils';
import { saveJobApi } from '../../api/api';

const Title = ({ url, title }) => (
  <a href={url ? url : ''} target="_blank">
    <div>{title}</div>
  </a>
);

const JobDetails = ({ details }) => {
  const { id, title, by, time, url } = details;

  const { preferred_username: username } = useSelector(
    (state) => state.user.user
  );

  const handleStarJobAction = async (job) => {
    const result = await saveJobApi({ ...job, username });
    console.log(result);
  };

  return (
    <tr key={id} className="bg-[#12172e] text-white">
      <td className="border border-slate-800 p-2 text-sm">
        <Title title={title} url={url} />
      </td>
      <td className="border border-slate-800 p-2 text-sm">
        By {by} - {unixToDateTime(time)}
      </td>
      <td className="border border-slate-800 p-2 text-sm">
        <div className="flex justify-center">
          <StarIcon onClick={handleStarJobAction(details)} />
        </div>
      </td>
    </tr>
  );
};

export default JobDetails;

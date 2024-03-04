import { StarFilledIcon } from '@radix-ui/react-icons';
import { useSelector, useDispatch } from 'react-redux';
import { unixToDateTime } from '../../utils/utils';

const Title = ({ url, title }) => (
  <a href={url ? url : ''} target="_blank">
    <div>{title}</div>
  </a>
);

const JobDetails = ({ details }) => {
  const { id, title, by, time, url } = details;

  const dispatch = useDispatch();

  const { preferred_username: username } = useSelector(
    (state) => state.user.user
  );

  const handleStarJobAction = async (job) => {
    dispatch({ type: 'SAVE_JOB_REQUESTED', payload: { ...job, username } });
  };

  return (
    <tr key={id} className="bg-[#12172e] text-white">
      <td className="border border-slate-800 p-2 text-sm">
        <Title title={title} url={url} />
      </td>
      <td className="border border-slate-800 p-2 text-sm">
        {by}
      </td>
      <td className="border border-slate-800 p-2 text-sm">
        {unixToDateTime(time)}
      </td>
      <td className="border border-slate-800 p-2 text-sm">
        <div className="flex justify-center cursor-pointer" onClick={() => handleStarJobAction(details)}>
          <StarFilledIcon />
        </div>
      </td>
    </tr>
  );
};

export default JobDetails;

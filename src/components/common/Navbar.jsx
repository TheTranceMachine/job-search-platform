import { DropdownMenu } from '@radix-ui/themes';
import { LockClosedIcon } from '@radix-ui/react-icons';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { persistor } from '../../store';

const Navbar = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleLogout = () => {
    persistor
      .purge()
      .then(() => {
        console.log('Local storage purged successfully.');
        dispatch({ type: 'USER_LOGOUT_REQUESTED' });
        // navigate('/login');
      })
      .catch((error) => {
        console.error('Error purging local storage:', error);
      });
  };

  return (
    <div className="flex h-14 bg-white rounded-tr-lg">
      <div className="w-full border-b flex justify-end">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <div className="flex items-center cursor-pointer hover:bg-slate-200 py-1 px-2 rounded-tr-lg">
              <div className="rounded-full bg-slate-600 text-white p-1.5 m-1">
                GS
              </div>
              Grzegorz Smolin
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="bg-slate-300 border border-slate-400 rounded shadow-md min-w-44">
            <DropdownMenu.Item
              className="text-black px-4 py-1 flex items-center justify-between gap-2 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
              <LockClosedIcon />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default Navbar;

import { useNavigate } from 'react-router-dom';

const AuthHoc = ({
  page,
  title,
  children,
  backButtonText,
  backButtonOnClick,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col place-content-center bg-gradient-to-r from-cyan-500 to-blue-500 h-screen">
      <div className="xl:w-2/6 lg:w-1/2 md:w-1/2 md:mx-auto py-2 px-8 text-3xl text-center text-white bg-gradient-to-t from-white from-0% to-35% animate-[pulse_5s_ease-in-out_infinite]">
        {title}
      </div>
      <div className="xl:w-2/6 lg:w-1/2 md:w-1/2 md:mx-auto py-10 px-8 bg-white rounded-b-lg shadow-md shadow-sky-600">
        {children}
      </div>
      <div className="xl:w-2/6 lg:w-1/2 md:w-1/2 md:mx-auto flex gap-2 justify-end items-start -translate-y-1.5 border-t-2 border-stone-100">
        {page === 'login' && (
          <button
            type="button"
            onClick={() => navigate('/forgot')}
            className="basis-30 text-center bg-slate-100 text-black py-2 px-6 rounded-bl-md rounded-br-md transition-color duration-200 hover:shadow-md hover:translate-y-1 shadow-inner"
          >
            Forgot password
          </button>
        )}
        <button
          type="button"
          onClick={backButtonOnClick}
          className="basis-30 mr-8 text-center bg-slate-100 text-black py-2 px-6 rounded-bl-md rounded-br-md transition-color duration-200 hover:shadow-md hover:translate-y-1 shadow-inner"
        >
          <span className="self-center">{backButtonText}</span>
        </button>
      </div>
    </div>
  );
};

export default AuthHoc;

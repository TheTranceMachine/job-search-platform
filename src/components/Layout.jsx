import Sidebar from './common/Sidebar';
import Main from './common/Main';

const LayoutStyle = {
  height: 'calc(100vh - 1rem)',
};

const Layout = () => (
  <div className="flex m-2 rounded-lg" style={LayoutStyle}>
    <Sidebar />
    <Main />
  </div>
);

export default Layout;

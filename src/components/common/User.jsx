import { useSelector } from 'react-redux';

const User = () => {
  const user = useSelector((state) => state.user.user);

  const bgColor = (name) => {
    let hash = 0;
    let i;

    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    // name.charCodeAt() return an int between 0 and 65535
    // left shift (<<)  operator moves to left by number of specified
    // bites after <<. The whole for loop will create a color hash
    // based on username length
    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  let color = bgColor(user.name);
  const customStyle = {
    display: 'flex',
    height: 35,
    width: 35,
    borderRadius: '100px',
    color: 'white',
    background: color,
    marginRight: '0.5rem',
  };

  return (
    <>
      <div style={customStyle}>
        <span className="m-auto">{user.name[0]}</span>
      </div>
      {user.name}
    </>
  );
};

export default User;

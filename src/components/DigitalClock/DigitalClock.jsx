import { useState } from 'react';

function DigitalClock() {
  const [time, setTime] = useState('');
  const formatTime = () => {
    const date = new Date();
    // toTimeString returns the complete time.
    // We split it by space to get the time component only,
    // then take the first value which is of use.
    const format = date.toTimeString().split(' ')[0];
    setTime(format);
  };

  useEffect(() => {
    setTimeout(formatTime, 1000);
  });

  return <div className="clock">{time}</div>;
}

export default DigitalClock;

import React, { useEffect, useState } from 'react';

const today = new Date().toDateString();
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const LiveClock = () => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((currentTime) => {
        const nextTime = new Date().toLocaleTimeString();
        return nextTime === currentTime ? currentTime : nextTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <span className="tracking-tight md:tracking-wide text-black-900 text-center">
      {time} {today} {timeZone}
    </span>
  );
};

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full border-t border-slate-800 bg-slate-950 p-4">
      <div className="container px-4 flex flex-col items-center gap-2">
        <p className="text-center text-xs tracking-wide text-slate-300">
          Designed and Developed by Madhukar Reddy.:::{' '}
          <LiveClock />
        </p>
      </div>
    </footer>
  );
};

export default Footer;

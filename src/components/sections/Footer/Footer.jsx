import React, { useEffect, useState } from 'react';
import './Footer.css';
import { usePortfolioData } from '../../../context/PortfolioContext';

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
    <span className="text-center tracking-tight text-slate-600 md:tracking-wide">
      {time} {today} {timeZone}
    </span>
  );
};

const Footer = () => {
  const { footer } = usePortfolioData();
  return (
    <footer className="site-footer px-4 py-3">
      <div className="site-footer__content mx-auto flex max-w-7xl flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <p className="text-center text-xs tracking-wide text-slate-500 sm:text-left">
          {footer.credit}
        </p>
        <p className="text-xs tracking-wide text-slate-500">
          <LiveClock />
        </p>
      </div>
    </footer>
  );
};

export default Footer;

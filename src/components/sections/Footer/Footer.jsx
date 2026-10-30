import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());
  const today = new Date().toDateString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-amber-950 p-4 absolute md:bottom-0 left-0 w-full">
      <div className="container px-4 flex flex-col items-center gap-2">
        <p className="text-sm text-black-900 tracking-wide text-center">
          Designed and Developed by Madhukar Reddy.:::{' '}
          <span className="tracking-tight md:tracking-wide text-black-900 text-center">
            {time} {today} {timeZone}
          </span>
        </p>
        <a
          href="https://www.netlify.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Deploys by Netlify"
        >
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"
            alt="Deploys by Netlify"
            className="h-8"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

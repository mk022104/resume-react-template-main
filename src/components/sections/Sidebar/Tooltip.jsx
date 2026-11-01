import React from "react";
import "./Tooltip.css";
import { trackPortfolioEvent } from '../../Analytics/plausibleAnalyticsUtils';

const Tooltip = ({ text, link, icon }) => {
  return (
    <div className="tooltip">
      <li className="m-2">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            trackPortfolioEvent('social_click', {
              platform: text.toLowerCase(),
              link_url: link,
            })
          }
          className="w-8 h-8 bg-white-100 rounded text-black-800 flex items-center justify-center hover:text-white hover:bg-purple-950"
        >
          {icon}
        </a>
        <span className="tooltip-text">{text}</span>
      </li>
    </div>
  );
};

export default Tooltip;
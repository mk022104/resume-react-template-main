import React from "react";
import "./Tooltip.css";
import { trackPortfolioEvent } from '../../Analytics/plausibleAnalyticsUtils';

const Tooltip = ({ text, link, icon }) => {
  return (
    <li className="tooltip">
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        aria-label={text}
        onClick={() =>
          trackPortfolioEvent('social_click', {
            platform: text.toLowerCase(),
            link_url: link,
          })
        }
        className="tooltip-link"
      >
        {icon}
      </a>
      <span className="tooltip-text" role="tooltip">
        {text}
      </span>
    </li>
  );
};

export default Tooltip;
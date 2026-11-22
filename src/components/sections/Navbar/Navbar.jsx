import React, { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import About from '../../pages/About/About';
import Contact from '../../pages/Contact/Contact';
import Portfolio from '../../pages/Portfolio/Portfolio';
import Service from '../../pages/Service/Service';
import Qualification from '../../pages/Qualification/Qualification.jsx';
import Group from '../../pages/Group/Group.js';
import AnalyticsRouteTracker from '../../Analytics/AnalyticsRouteTracker';
import './Navbar.css';
import { usePortfolioData } from '../../../context/PortfolioContext';

const updateMetaTag = (selector, attribute, value, content) => {
  let metaTag = document.head.querySelector(selector);
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attribute, value);
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute('content', content);
};

const RouteMetadata = () => {
  const { pathname } = useLocation();
  const { routeMetadata } = usePortfolioData();

  useEffect(() => {
    const metadata = routeMetadata[pathname.toLowerCase()] || {
      title: 'Page not found | Madhukar Ganga',
      description: 'The requested page could not be found.',
    };

    document.title = metadata.title;
    updateMetaTag(
      'meta[name="description"]',
      'name',
      'description',
      metadata.description
    );
    updateMetaTag(
      'meta[property="og:title"]',
      'property',
      'og:title',
      metadata.title
    );
    updateMetaTag(
      'meta[property="og:description"]',
      'property',
      'og:description',
      metadata.description
    );
    updateMetaTag(
      'meta[name="twitter:title"]',
      'name',
      'twitter:title',
      metadata.title
    );
    updateMetaTag(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      metadata.description
    );
  }, [pathname, routeMetadata]);

  return null;
};

const Navbar = () => {
  const { navigation } = usePortfolioData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  const closeMenuOnEscape = (event) => {
    if (event.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="z-30 mb-5 mt-5 rounded-2xl border border-slate-200/80 bg-white/95 px-3 py-2 shadow-lg shadow-slate-900/5 backdrop-blur md:sticky md:top-4"
        onKeyDown={closeMenuOnEscape}
      >
        <div className="flex items-center justify-between md:hidden">
          <span className="px-3 py-2 text-sm font-semibold text-slate-700">
            Navigation
          </span>
          <button
            ref={menuButtonRef}
            type="button"
            className="primary-nav-toggle rounded-lg px-3 py-2 text-sm font-semibold text-indigo-800 hover:bg-indigo-50"
            aria-controls="primary-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span aria-hidden="true">{isMenuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
        <ul
          id="primary-navigation"
          className={`mt-2 flex-col items-stretch md:mt-0 md:flex md:flex-row md:items-center ${
            isMenuOpen ? 'flex' : 'hidden'
          }`}
        >
          {navigation.map((item) => (
            <LinkItem
              item={item}
              key={item.to}
              onSelect={() => setIsMenuOpen(false)}
            />
          ))}
        </ul>
      </nav>
      <AnalyticsRouteTrackerContainer />
      <RouteMetadata />

      <div
        id="main-content"
        tabIndex="-1"
        className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/5"
      >
        <Switch>
          <Route exact path="/">
            <Redirect to="/about" />
          </Route>
          <Route exact path="/about" component={About} />
          <Route exact path="/services" component={Service} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/qualification" component={Qualification} />
          <Route exact path="/group" component={Group} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
};

const AnalyticsRouteTrackerContainer = () => {
  const location = useLocation();
  return <AnalyticsRouteTracker locationRef={location} />;
};

const NotFoundPage = () => (
  <section className="px-6 py-16 text-center" aria-labelledby="not-found-title">
    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-700">
      404
    </p>
    <h1 id="not-found-title" className="mb-3 text-2xl font-bold text-slate-900">
      Page not found
    </h1>
    <p className="mb-6 text-slate-600">
      The page may have moved or the address may be incorrect.
    </p>
    <Link
      to="/about"
      className="primary-nav-link inline-flex rounded-lg bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800"
    >
      Return to About
    </Link>
  </section>
);

const LinkItem = ({ item, onSelect }) => {
  const { title, to } = item;

  return (
    <li className="mx-1 my-1">
      <NavLink
        exact
        to={to}
        activeClassName="primary-nav-link--active"
        className="primary-nav-link block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-800"
        onClick={() => {
          onSelect();
          window.gtag?.('event', 'nav_click', {
            page_path: to,
            navigation_label: title,
          });
        }}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default Navbar;

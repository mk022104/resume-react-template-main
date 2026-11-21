import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
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
const navbarData = [
  {
    id: 1,
    title: 'About',
    to: '/about',
  },
  {
    id: 2,
    title: 'Services',
    to: '/services',
  },
  {
    id: 3,
    title: 'Experience',
    to: '/portfolio',
  },
  {
    id: 4,
    title: 'Education Details',
    to: '/Qualification',
  },
  {
    id: 5,
    title: 'Contact',
    to: '/contact',
  },
  {
    id: 6,
    title: 'Info',
    to: '/group',
  },
];

const Navbar = () => {
  return (
    <Router>
      <nav className="z-30 mb-5 mt-5 rounded-2xl border border-slate-200/80 bg-white/95 px-3 py-2 shadow-lg shadow-slate-900/5 backdrop-blur md:sticky md:top-4">
        <ul className="flex flex-wrap items-center">
          {navbarData.map((item) => (
            <LinkItem item={item} key={item.id} />
          ))}
        </ul>
      </nav>
      <AnalyticsRouteTrackerContainer />

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/5">
      <Switch>
        <Route exact path="/">
          <About />
        </Route>
        <Route path="/services">
          <Service />
        </Route>
        <Route path="/Portfolio">
          <Portfolio />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/Qualification">
          <Qualification />
        </Route>
        <Route path="/Group">
          <Group />
        </Route>
      </Switch>
      </div>
    </Router>
  );
};

const AnalyticsRouteTrackerContainer = () => {
  const location = useLocation();
  return <AnalyticsRouteTracker locationRef={location} />;
};

export default Navbar;

const LinkItem = ({ item }) => {
  const { title, to } = item;
  return (
    <li className="mx-1 my-1">
      <NavLink
        to={to}
        activeClassName="!bg-indigo-700 !text-white"
        className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-800"
        onClick={() =>
          window.gtag?.('event', 'nav_click', {
            page_path: to,
            navigation_label: title,
          })
        }
      >
        {title}
      </NavLink>
    </li>
  );
};

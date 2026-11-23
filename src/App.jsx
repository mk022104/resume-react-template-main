import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/sections/Footer/Footer';
import Navbar from './components/sections/Navbar/Navbar';
import ProfileCover from './components/sections/ProfileCover/ProfileCover';
import Sidebar from './components/sections/Sidebar/Sidebar';
import ChatWidget from './components/Chatbot/ChatWidget';
import PlausibleAnalytics from './components/Analytics/PlausibleAnalytics.jsx';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  return (
    <PortfolioProvider dataUrl={process.env.REACT_APP_PORTFOLIO_DATA_URL}>
      <Router>
        <div className="app-shell min-h-screen relative bg-slate-50 pb-20">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <PlausibleAnalytics />
        <ProfileCover />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap md:-mx-4">
            <div className="w-full lg:w-1/3 md:px-4">
              <Sidebar />
            </div>
            <div className="w-full lg:w-2/3 md:px-4">
              <Navbar />
            </div>
          </div>
        </div>
        <Footer />
        <ChatWidget />
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;

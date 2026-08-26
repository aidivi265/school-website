import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import FacilitiesPage from './pages/FacilitiesPage';
import ActivitiesPage from './pages/ActivitiesPage';
import AchievementsPage from './pages/AchievementsPage';
import GalleryPage from './pages/GalleryPage';
import NewsEventsPage from './pages/NewsEventsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-navy-100 mb-4">404</p>
      <h1 className="font-serif text-3xl font-bold text-navy-900 mb-3">Page Not Found</h1>
      <p className="text-slate-500 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-navy-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-navy-800 transition-colors shadow-md">
        Back to Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

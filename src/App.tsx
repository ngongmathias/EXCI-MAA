import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import GlobalOfficesPage from './pages/GlobalOfficesPage';
import InsightsPage from './pages/InsightsPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <ThemeProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="global-offices" element={<GlobalOfficesPage />} />
                    <Route path="insights" element={<InsightsPage />} />
                    <Route path="careers" element={<CareersPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="admin" element={<AdminPage />} />
                  </Route>
                </Routes>
              </div>
            </Router>
          </ThemeProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;

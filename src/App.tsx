import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import theme from './lib/theme';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import GlobalOfficesPage from './pages/GlobalOfficesPage';
import InsightsPage from './pages/InsightsPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CountryPage from './pages/CountryPage';
import ConsultationPage from './pages/ConsultationPage';
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
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageProvider>
          <AuthProvider>
            <ThemeProvider>
              <Router>
                <div className="App">
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<HomePage />} />
                      <Route path="sign-in" element={<SignInPage />} />
                      <Route path="sign-up" element={<SignUpPage />} />
                      <Route path="about" element={<AboutPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="consultation" element={<ConsultationPage />} />
                    <Route path="/global-offices" element={<GlobalOfficesPage />} />
                      <Route path="global-offices/:slug" element={<CountryPage />} />
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
      </MuiThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
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
import AccountingNewsPage from './pages/AccountingNewsPage';
import CareersPage from './pages/CareersPage';
import IndustriesPage from './pages/IndustriesPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CountryPage from './pages/CountryPage';
import ConsultationPage from './pages/ConsultationPage';
import BlogPostPage from './pages/BlogPostPage';
import EventDetailPage from './pages/EventDetailPage';
import AuditAssurancePage from './components/pages/services/AuditAssurancePage';
import TaxPage from './components/pages/services/TaxPage';
import AccountingOutsourcingPage from './components/pages/services/AccountingOutsourcingPage';
import PayrollHRPage from './components/pages/services/PayrollHRPage';
import AdvisoryPage from './components/pages/services/AdvisoryPage';
import RiskInternalAuditPage from './components/pages/services/RiskInternalAuditPage';
import LeadershipPage from './pages/LeadershipPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import EthicsPage from './pages/EthicsPage';
import QualityPage from './pages/QualityPage';
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
                      <Route path="insights/blog/:id" element={<BlogPostPage />} />
                      <Route path="insights/events/:id" element={<EventDetailPage />} />
                      <Route path="accounting-news" element={<AccountingNewsPage />} />
                      <Route path="careers" element={<CareersPage />} />
                      <Route path="industries" element={<IndustriesPage />} />
                      <Route path="contact" element={<ContactPage />} />
                      <Route path="about/leadership" element={<LeadershipPage />} />
                      <Route path="about/quality" element={<QualityPage />} />
                      <Route path="about/ethics" element={<EthicsPage />} />
                      <Route path="insights/case-studies" element={<CaseStudiesPage />} />
                      <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                      <Route path="cookie-policy" element={<CookiePolicyPage />} />
                      <Route path="services/audit-assurance" element={<AuditAssurancePage />} />
                      <Route path="services/tax" element={<TaxPage />} />
                      <Route path="services/accounting-outsourcing" element={<AccountingOutsourcingPage />} />
                      <Route path="services/payroll-hr" element={<PayrollHRPage />} />
                      <Route path="services/advisory" element={<AdvisoryPage />} />
                      <Route path="services/risk-internal-audit" element={<RiskInternalAuditPage />} />
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
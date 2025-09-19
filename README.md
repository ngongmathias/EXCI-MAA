# EXCI-MAA - Professional Accounting & Consulting Firm

A modern, multilingual website for EXCI-MAA, a professional accounting, auditing, and consulting firm with international presence.

## 🌟 Features

### Core Features
- **Multi-language Support**: English, French, Kinyarwanda, and Arabic
- **Responsive Design**: Mobile-first approach with professional corporate theme
- **SEO Ready**: Optimized metadata and sitemap generation
- **Authentication System**: Staff and client login with role-based access
- **Admin Dashboard**: Content management and analytics
- **Interactive Map**: Office locations with clickable pins
- **Training Booking**: Course registration and payment system
- **Contact Forms**: Email integration with Nodemailer
- **Document Upload**: Secure client document management

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Internationalization**: next-intl
- **Maps**: Leaflet & React Leaflet
- **Payments**: Stripe integration
- **Email**: Nodemailer
- **UI Components**: Custom components with Lucide React icons

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd exci-maa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.local.example .env.local
   ```
   
   Update the `.env.local` file with your configuration:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   
   # Stripe Configuration
   STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
   STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
   STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── about/         # About page
│   │   ├── services/      # Services page
│   │   ├── training/      # Training page
│   │   ├── contact/       # Contact page
│   │   └── page.tsx       # Home page
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Homepage hero section
│   ├── About.tsx          # About section
│   ├── Services.tsx       # Services section
│   ├── Training.tsx       # Training section
│   ├── Contact.tsx        # Contact section
│   └── ...                # Other components
├── i18n.ts               # Internationalization config
└── middleware.ts          # Next.js middleware

messages/                  # Translation files
├── en.json               # English translations
├── fr.json               # French translations
├── rw.json               # Kinyarwanda translations
└── ar.json               # Arabic translations
```

## 🌐 Internationalization

The website supports 4 languages:
- **English** (en) - Default
- **French** (fr) - Français
- **Kinyarwanda** (rw) - Ikinyarwanda
- **Arabic** (ar) - العربية

Language switching is available in the header, and the site automatically detects the user's preferred language.

## 🔐 Authentication

### Demo Credentials
- **Admin**: username: `admin`, password: `admin123`
- **Client**: username: `client`, password: `client123`

### User Roles
- **Admin**: Full access to admin dashboard, content management
- **Client**: Access to client portal, document uploads

## 📱 Pages & Features

### Public Pages
- **Home**: Hero section, about, services, training, partners, offices, contact
- **About**: Company history, team, values, mission
- **Services**: Detailed service descriptions, pricing, process
- **Training**: Course catalog, booking system, payment integration
- **Contact**: Contact forms, office locations, interactive map

### Admin Dashboard
- **Overview**: Analytics, recent activity, quick actions
- **Content Management**: News, training, gallery, services
- **Inquiries**: Contact form submissions, client communications
- **Settings**: Site configuration, email settings

### Client Portal
- **Document Upload**: Secure file sharing
- **Training History**: Past and upcoming courses
- **Communication**: Direct messaging with advisors

## 🎨 Design System

### Brand Colors
- **Primary Blue**: #2563eb (exci-blue-600)
- **Dark Blue**: #1e40af (exci-blue-800)
- **Light Blue**: #dbeafe (exci-blue-100)
- **White**: #ffffff
- **Gray**: Various shades for text and backgrounds

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body Text**: Regular weight (400)
- **Small Text**: Medium weight (500)

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 📧 Contact Integration

The contact form integrates with Nodemailer for email delivery. Configure your SMTP settings in the environment variables.

## 💳 Payment Integration

Stripe integration is set up for training course payments. Configure your Stripe keys in the environment variables.

## 🗺️ Map Integration

Interactive maps using Leaflet show office locations with clickable pins displaying contact information.

## 📄 SEO Features

- Meta tags for all pages
- Open Graph tags for social sharing
- Sitemap generation
- Structured data markup
- Mobile-friendly design

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted VPS

## 📞 Support

For technical support or questions about the website:
- Email: contact@excimaa.ca
- Phone: +1 (416) 624-2510

## 📄 License

This project is proprietary software owned by EXCI-MAA. All rights reserved.

---

**EXCI-MAA** - Global Tax Expertise
Professional accounting, auditing, and consulting services with international presence.

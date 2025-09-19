const fs = require('fs');
const path = require('path');

const envContent = `# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Database (if using one)
DATABASE_URL=your-database-url-here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads`;

const envPath = path.join(__dirname, '..', '.env.local');

// Only create the file if it doesn't exist
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log('.env.local file created successfully!');
  console.log('Please update the placeholder values with your actual configuration.');
} else {
  console.log('.env.local already exists. No changes were made.');
}

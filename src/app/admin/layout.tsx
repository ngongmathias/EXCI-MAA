import {Inter} from 'next/font/google';
import '../[locale]/globals.css';

const inter = Inter({subsets: ['latin']});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

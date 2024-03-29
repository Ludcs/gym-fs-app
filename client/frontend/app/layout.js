import { Roboto } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthContextProvider from './contexts/authContext';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Elite Knights Gym 🦾',
  description: 'Gimnasio ubicado en la ciudad de Parana',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-primary">
      <AuthContextProvider>
        <body className={`flex flex-col min-h-screen ${roboto.className}`}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </AuthContextProvider>
    </html>
  );
}

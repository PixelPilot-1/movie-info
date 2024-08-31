import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from './components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Movie database. ',
  description:
    'Search for your movies in this single place. Almost all movies in the world',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar />

        {children}
      </body>
    </html>
  );
}

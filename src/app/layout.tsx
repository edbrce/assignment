import { AuthContextProvider } from '@/context/AuthContext';
import './globals.css';
import Navbar from './components/navigation/Navbar';

// Metadata for the application
export const metadata = {
  title: 'Software and Agile Assignment',
  description: 'Submission for the Sofware engineering and Agile module',
};

// Root layout component for the application
export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      {/*
        The <head /> component will contain the components returned by the nearest parent
        head.js. It can be used to define the document head for SEO, metadata, and other purposes.
        Learn more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='flex flex-col h-screen'>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}

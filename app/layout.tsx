import { Fraunces, Outfit } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import SplashScreen from '@/components/structure/SplashScreen';
import { SheetProvider } from '@/context/SheetContext';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'The Sleep Lab by Equilibria Labs',
  description: "It's time to get your sleep on track.",
};

const fraunces = Fraunces({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-fraunces',
});

const outfit = Outfit({
  display: 'swap',
  subsets: ['latin'],
  weight: ['200', '600'],
  variable: '--font-outfit',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${fraunces.variable} ${outfit.variable} font-body`}
      suppressHydrationWarning
    >
      <body className='bg-background text-foreground'>
        <ThemeProvider
          attribute='class'
          value={{
            'theme-1': 'theme-1',
            'theme-2': 'theme-2',
            'theme-3': 'theme-3',
            'theme-4': 'theme-4',
          }}
          defaultTheme='theme-1'
        >
          <SheetProvider>
            <SplashScreen />
            <main className='min-h-screen flex flex-col items-center'>
              {children}
            </main>
          </SheetProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

import { fontHeading, fontBody } from 'path/to/font/definitions'; // Ensure correct path

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        />
      </head>
      <body className={`${fontHeading.variable} ${fontBody.variable} antialiased font-body`}>
        {children}
      </body>
    </html>
  );
}
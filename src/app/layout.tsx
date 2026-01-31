import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dumbo Echo - Talking Elephant',
  description: 'Transform your voice into a majestic elephant voice and interact with a playful elephant character',
  keywords: ['elephant', 'voice modulation', 'web audio', 'interactive'],
  authors: [{ name: 'Wani Park' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

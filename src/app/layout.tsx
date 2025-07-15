import './globals.css';
import ParallaxLayout from '@/components/ParallaxLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gild & Grimoire',
  description: 'Where creators forge relics and guilds shape the realm.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ParallaxLayout>
          {children}
        </ParallaxLayout>
      </body>
    </html>
  );
}
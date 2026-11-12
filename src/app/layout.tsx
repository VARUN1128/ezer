import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';

export const metadata: Metadata = {
  title: 'Ezer — Know Before You Buy | India’s Second-Hand Verification Platform',
  description:
    'Ezer connects second-hand product buyers with verified local expert inspection partners across India. Physically verify OLX, Facebook Marketplace, and Quikr items before you pay.',
  keywords: [
    'second hand inspection',
    'OLX product verification',
    'Facebook marketplace inspection',
    'used bike inspection Bangalore',
    'used car inspection Mumbai',
    'used iPhone check India',
    'Ezer',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#101010] text-white min-h-screen flex flex-col selection:bg-[#F5C45E] selection:text-[#101010]">
        <Navbar />
        <main className="flex-1 pb-16 sm:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}

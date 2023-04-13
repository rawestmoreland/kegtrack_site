import Head from 'next/head';

import { CallToAction } from '@/components/CallToAction';
import { Faqs } from '@/components/Faqs';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Pricing } from '@/components/Pricing';
import { PrimaryFeatures } from '@/components/PrimaryFeatures';
import { Reviews } from '@/components/Reviews';
import { SecondaryFeatures } from '@/components/SecondaryFeatures';

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>KegTrack - Always know what's left.</title>
        <meta
          name="description"
          content="Monitor your keg volumes without expensive hardware. All you need is your phone and the KegTrack app."
        />
      </Head>
      <Header />
      <main className="flex-1 overflow-y-auto">
        <Hero />
        {/* <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Reviews />
        <Pricing />
        <Faqs /> */}
      </main>
      <Footer />
    </div>
  );
}

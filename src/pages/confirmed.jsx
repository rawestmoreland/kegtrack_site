import Head from 'next/head';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Head>
        <title>KegTrack - Always know what's left.</title>
        <meta
          name="description"
          content="Monitor your keg volumes without expensive hardware. All you need is your phone and the KegTrack app."
        />
      </Head>
      <Header />
      <main className="relative h-full flex-1 overflow-y-auto">
        <div className="mt-28 flex w-full flex-col items-center justify-center gap-4">
          <h2 className="text-center text-3xl font-bold">
            Your email has been confirmed.
          </h2>
          <span className="text-xl font-semibold">
            Return to the KegTrack App and enjoy!
          </span>
        </div>
        {/* <PrimaryFeatures />
          <SecondaryFeatures />
          <CallToAction />
          <Reviews />
          <Pricing />
          <Faqs /> */}
      </main>
      <Footer />
    </>
  );
}

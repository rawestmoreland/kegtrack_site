import Head from 'next/head';
import { Header } from '@/components/Header';
import Image from 'next/image';

export default function DeletePage() {
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
      <main className="container mx-auto mb-10 flex-1 px-6 pb-12">
        <h1 className="mb-10 text-3xl">To delete your KegTrack account:</h1>
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-red-500/20 p-8 font-bold text-red-700">
          <span>Caution!</span>
          <span>Account deletion is instant and irreversible.</span>
        </div>
        <ol className="mt-10 grid list-decimal grid-cols-2 gap-y-8">
          <li>
            <div className="flex flex-col gap-4">
              <span>Choose the user settings screen</span>
              <Image
                src="/images/delete/step-1.jpeg"
                width={300}
                height={300}
              />
            </div>
          </li>
          <li>
            <div className="flex flex-col gap-4">
              <span>Choose "delete my account"</span>
              <Image
                src="/images/delete/step-2.jpeg"
                width={300}
                height={300}
              />
            </div>
          </li>
          <li>
            <div className="flex flex-col gap-4">
              <span>Confirm the account deletion</span>
              <Image
                src="/images/delete/step-3.jpeg"
                width={300}
                height={300}
              />
            </div>
          </li>
        </ol>
      </main>
    </div>
  );
}

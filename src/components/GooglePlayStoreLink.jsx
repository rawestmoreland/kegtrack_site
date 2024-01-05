import Image from 'next/image';

import googlePlay from '@/images/google-play-badge.svg';

export default function GooglePlayStoreLink() {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.smallbatchbru.kegminder"
      target="_blank"
      rel="noopener noreferrer"
      className="h-10"
    >
      <Image src={googlePlay} unoptimized className="h-full w-full" />
    </a>
  );
}

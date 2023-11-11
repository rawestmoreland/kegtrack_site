import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="h-full bg-gray-50 antialiased" lang="en">
      <Head />
      <meta name="apple-itunes-app" content="app-id=1458783381" />
      <body className="flex h-full flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

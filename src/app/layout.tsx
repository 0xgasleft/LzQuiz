import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "LZ Dungeon",
  description: "Think you know LayerZero? Think again.",
  icons: [{ rel: "icon", url: "/lz_logo.png" }],
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = headers().get("cookie");

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

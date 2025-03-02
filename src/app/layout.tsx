
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nico Baigorria",
  description: "THREE FIBER PORTFOLIO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
 {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );

}
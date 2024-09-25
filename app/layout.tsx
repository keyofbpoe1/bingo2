import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fallacy Bingo",
  description: "Play bingo with logical fallacies!",
  icons: {
    //icon: "/exclamation-16.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main style={{ minHeight: `calc(100vh - 12rem)` }}>{children}</main>
        <Footer className="fixed bottom-0 left-0 right-0" />
      </body>
    </html>
  );
}


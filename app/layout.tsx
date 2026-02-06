import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Remember Me - Preserve the Voice of Your Loved Ones",
  description: "Using AI to preserve and recreate the voice of a loved one. A comforting way to reconnect with cherished memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

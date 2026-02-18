import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import { auth } from "@/auth";
import { ReactNode } from "react";
import "./globals.css";

const capture = localFont({
  src: "@/fonts/Capture_It.ttf",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className={capture.className}>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

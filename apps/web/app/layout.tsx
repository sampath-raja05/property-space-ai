import type { Metadata } from "next";
import AuthSessionProvider from "@/components/providers/session-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Property Space AI",
  description: "AI-powered real estate analytics for India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}

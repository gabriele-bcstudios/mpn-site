import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteNavbar } from "../components/layout/SiteNavbar";
import { PageTransition } from "../components/layout/PageTransition";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MPN Language Platform | Learn Italian and Spanish",
  description:
    "Master Italian and Spanish. On your terms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}> 
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteNavbar />
          <PageTransition>{children}</PageTransition>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}

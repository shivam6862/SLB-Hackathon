import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import { NotificationContextProvider } from "@/contexts/NotificationContext";
import Notifications from "@/components/Notification/Notifications";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationContextProvider>
          <Notifications />
          <Header />
          {children}
        </NotificationContextProvider>
      </body>
    </html>
  );
}

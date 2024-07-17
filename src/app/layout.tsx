import type { Metadata } from "next";
import "./globals.css";
import TopNav from "../components/navBar/TopNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "../components/Providers";
import { auth } from "../auth";

export const metadata: Metadata = {
  title: "NextDate",
  description: "Find your next date here",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id || null;
  const profileComplete = Boolean(session?.user.profileComplete);

  return (
    <html lang="en">
      <body>
        <Providers userId={userId} profileComplete={profileComplete}>
          <ToastContainer
            position="bottom-right"
            hideProgressBar
            className="z-50"
          />
          <TopNav />
          <main className="container mx-auto"> {children}</main>
        </Providers>
      </body>
    </html>
  );
}

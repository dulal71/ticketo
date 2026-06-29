import { ToastContainer } from "react-toastify";
import "./globals.css";
import NextThemeProvider from "@/providers/NextThemeProvider";

export const metadata = {
  title: "Ticketo | Premium Event Discovery & Ticket Booking Platform",
  description:
    "Browse, discover, and purchase tickets for the finest premium events near you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <main className="flex-grow flex flex-col">
            {children}
          </main>

          <ToastContainer />
        </NextThemeProvider>
      </body>
    </html>
  );
}
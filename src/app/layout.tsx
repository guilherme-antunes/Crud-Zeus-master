import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Crud",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className="bg-gradient-to-l from-cyan-900  to-slate-800">
          <div className="flex">
            <Sidebar />
              <main className="flex-1 ml-20 p-20">
                {children}
              </main>
          </div>
        </body>
    </html>
  );
}

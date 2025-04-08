import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import Header from "@/app/ui/web/header";
import Navbar from "../ui/web/navbar/navbar";
import Footer from "../ui/web/footer/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "FAMED",
    default: "FAMED",
  },
  description: "Website da faculdade de Medicina - UEM.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://med.uem.mz"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} antialiased`}>
        <Header />
        <Navbar />
        <div className="pl-3 pr-3">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

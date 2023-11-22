import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import Header from "@/app/ui/web/header";
import Navbar from "../ui/web/navbar/navbar";
import Footer from "../ui/web/footer/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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

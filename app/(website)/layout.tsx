import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import Header from "@/app/ui/web/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <div className="pl-3 pr-3">
          {children}
        </div>
      </body>
    </html>
  );
}

import "../globals.css";

import HeaderContainer from "./components/header/header-container";
import Footer from "./components/footer/footer";
import NavbarContainer from "./components/navbar/navbar-container";

export const metadata = {
  title: "FAMED",
  description: "Faculdade de Medicina da Universidade Eduardo Mondlane, FAMED - UEM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderContainer />
        <NavbarContainer />
        <div className="pl-3 pr-3">
          {children}  
        </div>
        <Footer />
        ola, tudo bem?
      </body>
    </html>
  );
}
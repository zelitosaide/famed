import "./navbar.css";
import logo from "@/public/logo.png";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";
import { getLinks } from "@/app/api/server";

export default async function NavbarContainer() {
  const navLinks = await getLinks("nav");

  return (
    <div 
      style={{ backgroundColor: "rgb(var(--card-rgb))" }} 
      className="pl-28 pr-28 flex items-center justify-between relative"
    >
      <Link href="/">
        <Image
          alt="Famed logo"
          src={logo}
          width={208}
          className="pl-3 pt-3 pb-5 grow-0 cursor-pointer"
        />
      </Link>

      <div>
        <Navbar navLinks={navLinks} />
      </div>
    </div>
  );
}
import { getLinks } from "@/app/lib/web/data";
import Image from "next/image";
import Link from "next/link";
import Nav from "./nav";

import "./navbar.css";

export default async function Navbar() {
  const links = await getLinks("nav");

  return (
    <div className="bg-[#F2F8F2] pl-28 pr-28 flex items-center justify-between relative">
      <Link href="/">
        <Image
          alt="Famed logo"
          src="/logo.png"
          width={208}
          height={80.6861598}
          className="pl-3 pt-3 pb-5 grow-0 cursor-pointer"
        />
      </Link>
      <Nav links={links} />
    </div>
  );
}
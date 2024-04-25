import { getLinks } from "@/app/lib/web/data";
import HeaderLinks from "./header-links";
import Link from "next/link";

import "remixicon/fonts/remixicon.css";

export default async function Header() {
  const headerLinksData = getLinks("cabecalho");
  const socialNetworksData = getLinks("redes-sociais");

  const [headerLinks, socialNetworks] = await Promise.all([
    headerLinksData, socialNetworksData
  ]);

  return (
    <header className="pl-28 pr-28 flex justify-between bg-[#146F12]">
      <div>
        <HeaderLinks links={headerLinks} />
      </div>

      <div className="flex gap-2 items-center pr-3">
        {/* <RightHeader
          socialNetworks={
            socialNetworks instanceof Array 
              ? socialNetworks[0].children 
              : socialNetworks.children} 
        /> */}
        <Link 
          className="font-[500] leading-[1.25rem] text-[0.875rem] select-none outline-none pt-2 pb-2 pl-3 pr-3 block text-slate-200 hover:bg-[#0d5e0c] transition-colors" 
          href="/login"
        >
          Log in
        </Link>
        <Link 
          className="font-[500] leading-[1.25rem] text-[0.875rem] select-none outline-none pt-2 pb-2 pl-3 pr-3 block text-slate-200 hover:bg-[#0d5e0c] transition-colors" 
          href="https://twitter.com/fameduemmz"
          target="_blank"
        >
          <i className="ri-twitter-x-fill" />
        </Link>
      </div>
    </header>
  );
}
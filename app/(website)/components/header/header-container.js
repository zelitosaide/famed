import "./header.css";

import { getLinks } from "@/app/api/server";

import LeftHeader from "./left-header";
import RightHeader from "./right-header";

export default async function HeaderContainer() {
  const headerLinksData = getLinks("cabecalho");
  const socialNetworksData = getLinks("redes-sociais");

  const [headerLinks, socialNetworks] = await Promise.all([
    headerLinksData, socialNetworksData
  ]);
  
  return (
    <header 
      style={{ backgroundColor: "rgb(var(--accent-rgb))" }} 
      className="pl-28 pr-28 flex justify-between"
    >
      <div>
        <LeftHeader headerLinks={headerLinks} />
      </div>

      <div className="flex gap-2 items-center pr-3">
        <RightHeader 
          socialNetworks={
            socialNetworks instanceof Array 
              ? socialNetworks[0].children 
              : socialNetworks.children} 
        />
      </div>
    </header>
  );
}
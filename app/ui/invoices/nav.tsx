"use client";

import "./nav.css";
import Link from "next/link";
import * as Menubar from "@radix-ui/react-menubar";

export default function Nav({ links }: any) {
  return (
    <Menubar.Root className="MenubarRoot">
      {links.map((link: any) => {
        return (
          <Menubar.Menu key={link.segment}>
            <Menubar.Trigger asChild>
              <Link className="MenubarTrigger" href={`/dashboard/invoices/${link.segment}`}>{link.title}</Link>
            </Menubar.Trigger>
            <Menubar.Portal>
            <Menubar.Content></Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>
        );
      })}
    </Menubar.Root>
  );
}
"use client";

import "./nav.css";
import Link from "next/link";
import * as Menubar from "@radix-ui/react-menubar";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export default function Nav({ links }: any) {
  return (
    <Menubar.Root className="MenubarRoot">
      {links.filter((item: any) => item.title !== "Investigação").map((link: any) => {
        return (
          <Menubar.Menu key={link._id}>
            {link.children.length > 0 ? (
              <>
                <Menubar.Trigger className="MenubarTrigger">{link.title}</Menubar.Trigger>
                <Menubar.Portal>
                  <Menubar.Content className="MenubarContent" align="start" sideOffset={5} alignOffset={-3}>
                    {link.title === "Ensino" ? (
                      link.children.filter((item: any) => item.title !== "Cursos de Curta Duração").map(function(child: any) {
                        return (
                          <Menubar.Sub key={child.title}>
                            <Menubar.SubTrigger
                              className="MenubarSubTrigger"
                              style={{ 
                                height: "30px", 
                                padding: "0 10px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {child.title} 
                              <div className="RightSlot">
                                <ChevronRightIcon />
                              </div>
                            </Menubar.SubTrigger>

                            <Menubar.Portal>
                              <Menubar.SubContent className="MenubarSubContent" alignOffset={-5}>
                                {child.children.map(function(i: any) {
                                  return (
                                    <Menubar.Item 
                                      key={i.title} 
                                      className="MenubarItem"
                                      asChild
                                    >
                                      <Link
                                        style={{ 
                                          height: "30px", 
                                          padding: "0 10px",
                                          display: "flex",
                                          alignItems: "center",
                                        }} 
                                        href={`/dashboard/static-pages/${i.segment}`}
                                      >
                                        {i.title}
                                      </Link>
                                    </Menubar.Item>
                                  );
                                })}
                              </Menubar.SubContent>
                            </Menubar.Portal>
                          </Menubar.Sub>
                        );
                      })
                    ) : (
                      link.children.filter((item: any) => item.segment).map(function(child: any) {
                        return (
                          <Menubar.Item className="MenubarItem" key={child.segment} asChild>
                            <Link 
                              style={{ 
                                height: "30px", 
                                padding: "0 10px",
                                display: "flex",
                                alignItems: "center",
                              }} 
                              href={`/dashboard/static-pages/${child.segment}`}
                            >
                              {child.title}
                            </Link>
                          </Menubar.Item>
                        );
                      })
                    )}
                  </Menubar.Content>
                </Menubar.Portal>
              </>
            ) : (
              <>
                <Menubar.Trigger asChild>
                  <Link className="MenubarTrigger" href={`/dashboard/static-pages/${link.segment}`}>{link.title}</Link>
                </Menubar.Trigger>
                <Menubar.Portal>
                <Menubar.Content></Menubar.Content>
                </Menubar.Portal>
              </>
            )}
          </Menubar.Menu>
        );
      })}
    </Menubar.Root>
  );
}
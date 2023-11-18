"use client";

import Link from "next/link";
import "./nav.css";
import * as Menubar from "@radix-ui/react-menubar";

export default function Nav({ links }: any) {
  return (
    <Menubar.Root className="MenubarRoot">
      {links.map((link: any) => {
        return (
          <Menubar.Menu key={link._id}>
            {link.children.length > 0 ? (
              <>
                <Menubar.Trigger className="MenubarTrigger">{link.title}</Menubar.Trigger>
                <Menubar.Portal>
                  <Menubar.Content className="MenubarContent" align="start" sideOffset={5} alignOffset={-3}>

                    {link.title === "Ensino" ? (
                      link.children.map(function(child: any) {
                        if (child.title === "Cursos de Curta Duração") {
                          return null;
                        }

                        return (
                          <Menubar.Sub>
                            <Menubar.SubTrigger>
                              {child.title} <div>:::</div>
                            </Menubar.SubTrigger>

                            <Menubar.Portal>
                              <Menubar.SubContent alignOffset={-5}>
                                {child.children.map(function(i: any) {
                                  return (
                                    <>
                                      <Menubar.Item>{i.title}</Menubar.Item>
                                      <Menubar.Separator />
                                    </>
                                  );
                                })}
                              </Menubar.SubContent>
                            </Menubar.Portal>
                          </Menubar.Sub>
                        );
                      })
                    ) : (
                      link.children.map(function(child: any) {
                        const href = 
                          child.segment ? `/web/${link.segment}/${child.segment}` : child.href;

                        if (!child.segment) {
                          return null;
                        }

                        return (
                          <Menubar.Item key={child.title}>
                            <Link href={href}>
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
              <Menubar.Trigger className="MenubarTrigger" asChild>
                <Link href="/dashboard/customers">{link.title}</Link>
              </Menubar.Trigger>
            )}
          </Menubar.Menu>
        );
      })}
    </Menubar.Root>
    // <div className="bg-blue-600">
    //   <ul>
    //     {links.map(function(link: any) {
    //       return (
    //         <li key={link._id}>
    //           {link.children.length > 0 ? (
    //             <>
    //               <p style={{ background: "red" }}>{link.title}</p>
    //               {link.title === "Ensino" ? (
    //                 <ul>
    //                   {link.children.map(function(child: any) {
                        
    //                   })}
    //                 </ul>
    //               ) : (
    //                 <ul>
    //                   {link.children.map(function(child: any) {
    //                     const href = 
    //                       child.segment ? `/web/${link.segment}/${child.segment}` : child.href;
    //                     return (
    //                       <a key={child.title} href={href}>{child.title}</a>
    //                     );
    //                   })}
    //                 </ul>
    //               )}
    //             </>
    //           ) : (
    //             <a style={{ background: "red" }} href={`/web/${link.segment}`}>
    //               {link.title}
    //             </a>
    //           )}
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </div>
  );
}
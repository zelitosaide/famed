"use client";

import "./header-links.css";

import { Fragment } from "react";
import { Item, List, Root, Trigger, Content } from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import ListItem from "./list-item";

export default function HeaderLinks({ links }: any) {
  return (
    <Root className="H-NavigationMenuRoot">
      <List className="H-NavigationMenuList">
        {links.map(function(link: any) {
          return (
            <Item key={link._id}>
              {link.children.length > 0 ? (
                <>
                  <Trigger className="H-NavigationMenuTrigger">
                    {link.title} <CaretDownIcon className="H-CaretDown" aria-hidden />
                  </Trigger>
                  <div className="H-NavigationMenuContentWrapper">
                    <Content className="H-NavigationMenuContent">
                      <div className="H-NavigationMenuContentBoundary">
                        <ul className="H-RowList">
                          {link.children.map(function(child: any) {
                            const href = 
                              child.segment ? `/web/${link.segment}/${child.segment}` : child.href;

                            return (
                              <Fragment key={child.title}>
                                <ListItem href={href}>{child.title}</ListItem>
                                <Separator style={{ margin: "6px 0"}} className="SeparatorRoot" />
                              </Fragment>
                            );
                          })}
                        </ul>
                      </div>
                    </Content>
                  </div>
                </>
              ) : (
                <Link className="H-NavigationMenuLink" href={`/web/${link.segment}`}>
                  {link.title}
                </Link>
              )}
            </Item>
          );
        })}
      </List>
    </Root>
  );
}
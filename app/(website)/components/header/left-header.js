"use client";

import NextLink from "next/link";

import { Fragment } from "react";
import { Item, List, Root, Trigger, Content } from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";

import ListItem from "./list-item";

export default function LeftHeader({ headerLinks }) {
  return (
    <Root className="H-NavigationMenuRoot">
      <List className="H-NavigationMenuList">
        {headerLinks.map(function(link) {
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
                          {link.children.map(function(child) {
                            const href = 
                              child.segment ? `/${link.segment}/${child.segment}` : child.href;

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
                <NextLink className="H-NavigationMenuLink" href={`/${link.segment}`}>
                  {link.title}
                </NextLink>
              )}
            </Item>
          );
        })}
      </List>
    </Root>
  );
}
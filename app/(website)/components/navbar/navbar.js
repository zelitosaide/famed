"use client";

import NextLink from "next/link";

import { Root, List, Item, Link, Trigger, Content } from "@radix-ui/react-navigation-menu";
import { CaretDownIcon, ComponentInstanceIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import { Fragment } from "react";

import ListItem from "./list-item";

export default function Navbar({ navLinks }) {
  return (
    <Root className="NavigationMenuRoot">
      <List className="NavigationMenuList">
        {navLinks.map(function(link) {
          return (
            <Item key={link._id}>
              {link.children.length > 0 ? (
                <>
                  <Trigger className="NavigationMenuTrigger">
                    {link.title} <CaretDownIcon className="CaretDown" aria-hidden />
                  </Trigger>
                  <div className="NavigationMenuContentWrapper">
                    <Content className="NavigationMenuContent">
                      <div className="NavigationMenuContentBoundary">
                        {link.title === "Ensino" ? (
                          link.children.map(function(child) {
                            return (
                              <div key={child.title}>
                                {child.segment === "curta-duracao" ? (
                                  <Link asChild>
                                    <NextLink 
                                      className="NavigationMenuContentSectionHeader Link" 
                                      href={`/${link.segment}/${child.segment}`}
                                    >  
                                      <ComponentInstanceIcon /> {child.title} <DoubleArrowRightIcon />
                                    </NextLink>
                                  </Link>
                                ) : (
                                  <>
                                    <h3 className="NavigationMenuContentSectionHeader">
                                      <ComponentInstanceIcon /> {child.title}:
                                    </h3>

                                    <Separator className="SeparatorRoot" />

                                    {child.children.length > 2 ? (
                                      <ul className="GridList two">
                                        {child.children.map(function(c) {
                                          return (
                                            <li key={c.title}>
                                              <Link asChild>
                                                <NextLink 
                                                  className="ListItemLink"
                                                  href={`/${link.segment}/${child.segment}/${c.segment}`}
                                                >
                                                  <div className="ListItemHeading">{c.title}</div>
                                                  <p className="ListItemText">
                                                    {c.description}
                                                  </p>
                                                </NextLink>
                                              </Link>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    ) : (
                                      <ul className="GridList one">
                                        <li>
                                          <Link asChild>
                                            <NextLink 
                                              className="ListItemLink"
                                              href={`/${link.segment}/${child.segment}/${child.children[0].segment}`}
                                            >
                                              <div className="ListItemHeading">{child.children[0].title}</div>
                                              <p className="ListItemText">
                                                {child.children[0].description}
                                              </p>
                                            </NextLink>
                                          </Link>
                                        </li>
                                      </ul>
                                    )}
                                  </>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <ul className="RowList">
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
                        )}
                      </div>
                    </Content>
                  </div>
                </>
              ) : (
                <NextLink className="NavigationMenuLink" href={`/${link.segment}`}>
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
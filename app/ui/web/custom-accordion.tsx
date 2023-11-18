"use client";

import "./custom-accordion.css";

import { Root, Item, Header, Trigger, Content } from "@radix-ui/react-accordion";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { forwardRef } from "react";

export default function CustomAccordion({ links }: any) {
  return (
    <Root className="AccordionRoot" type="single" collapsible>
      {links.map(function(link: any) {
        return (
          <Item className={`AccordionItem ${link.children.length === 0 ? "ActiveLink" : ""}`} key={link._id} value={link._id}>
            <AccordionTrigger segment={link?.segment} hasChildren={link.children.length > 0}>
              {link.title}
            </AccordionTrigger>
            {link.children.length > 0 && (
              <AccordionContent>
                {link.children.map(function(child: any) {
                  const href = child.href ? child.href : `/web/${link.segment}/${child.segment}`;
                  return (
                    <Link 
                      style={{ 
                        display: "flex", 
                        alignItems: "center",
                        paddingLeft: 20,
                        paddingRight: 10,
                        paddingTop: 10,
                        paddingBottom: 10
                      }} 
                      className="block hover:bg-[#1F8E23]" 
                      href={href} 
                      key={child.title}
                      target={child.href ? "_blank" : "" }
                    >
                      {child.title}
                    </Link>
                  );
                })}
              </AccordionContent>
            )}
          </Item>
        );
      })}
    </Root>
  );
}

const AccordionTrigger = forwardRef(({ children, className, segment, hasChildren, ...props }: any, forwardedRef) => (
  <Header className="AccordionHeader">
    {hasChildren ? (
      <Trigger
        className={"AccordionTrigger"}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronRightIcon className="AccordionChevron" aria-hidden />
      </Trigger>
    ) : (
      <Link
        className={"AccordionTrigger"}
        href={segment === "/" ? segment : "/web/" + segment}
      >
        {children}
      </Link>
    )}
  </Header>
));

const AccordionContent = forwardRef(({ children, className, ...props }: any, forwardedRef) => (
  <Content
    className="AccordionContent"
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Content>
));

AccordionContent.displayName = "AccordionContent";

AccordionTrigger.displayName = "AccordionTrigger";
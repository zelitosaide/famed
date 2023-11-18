import "./list-item.css";

import NextLink from "next/link";
import { forwardRef } from "react";
import { Link } from "@radix-ui/react-navigation-menu";

const ListItem = forwardRef(({ children, ...props }: any, ref) => {
  return (
    <li>
      {props.href.includes("http") ? (
        <Link asChild>
          <a target="_blank" className="ListItem" {...props} ref={ref}>
            <div>{children}</div>
          </a>
        </Link>
      ) : (
        <Link asChild>
          <NextLink href={props.href} className="ListItem">
            <div>{children}</div>
          </NextLink>
        </Link>
      )}
    </li>
  )
});

ListItem.displayName = "ListItem";

export default ListItem;
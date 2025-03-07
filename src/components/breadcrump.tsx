"use client";

import Link from "next/link";
import { BreadcrumbItem } from "@/types/breadcrumb";
import { JSX } from "react";

interface Props {
  breadcrumb: BreadcrumbItem;
}

const Breadcrumb = ({ breadcrumb }: Props) => {
  const renderBreadcrumb = (item?: BreadcrumbItem, isFirst = true): JSX.Element | null => {
    if (!item) return null;

    return (
      <>
        <Link
          href={item.url}
          className={`text-[14px] ${
            isFirst ? "font-extrabold" : "font-bold"
          } text-[#010D3D]`}
        >
          {item.title}
        </Link>
        {item.children && (
          <>
            <span className="mx-2 text-[#010D3D]">{" > "}</span>
            {renderBreadcrumb(item.children, false)}
          </>
        )}
      </>
    );
  };

  return <nav className="flex">{renderBreadcrumb(breadcrumb)}</nav>;
};

export default Breadcrumb;

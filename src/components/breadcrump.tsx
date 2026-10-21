"use client";

import Link from "next/link";
import { BreadcrumbItem } from "@/types/breadcrumb";
import { Fragment, JSX } from "react";

interface Props {
  breadcrumb: BreadcrumbItem;
}

const Breadcrumb = ({ breadcrumb }: Props) => {
  const renderBreadcrumb = (item?: BreadcrumbItem, isFirst = true): JSX.Element | null => {
    if (!item) return null;

    return (
      <Fragment key={item.url}>
        <Link
          href={item.url}
          aria-current={item.children ? undefined : "page"}
          className={`text-[14px] ${
            isFirst ? "font-extrabold" : "font-bold"
          } text-[#010D3D]`}
        >
          {item.title}
        </Link>
        {item.children && (
          <>
            <span className="mx-2 text-[#010D3D]" aria-hidden="true">{" > "}</span>
            {renderBreadcrumb(item.children, false)}
          </>
        )}
      </Fragment>
    );
  };

  return <nav aria-label="Migas de pan" className="flex">{renderBreadcrumb(breadcrumb)}</nav>;
};

export default Breadcrumb;

import React, { useState } from "react";
import { DASHBOARD_SIDEBAR_LINKS } from "../../routes";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { MdOutlineArrowCircleRight } from "react-icons/md";

const linkClass = `${"flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-200 hover:no-underline active:bg-neutral-200 rounded-sm text-base"}`;
const linkClassWithPx = `${"flex items-center gap-2 font-light px-2 py-2 hover:bg-neutral-200 hover:no-underline active:bg-neutral-200 rounded-sm text-base"}`;
export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${
        open ? "w-60" : "w-16"
      } duration-500 p-3 flex flex-col border-r border-orange-100 bg-white relative`}
    >
      <div
        className={`${
          open
            ? "flex justify-between items-center mb-5"
            : "flex justify-center mb-2"
        }`}
      >
        {open ? (
          <>
            <p className="ml-8 text-2xl font-extralight">
              Point <span className="text-lg text-orange-500">of</span> Sales
            </p>
            <MdOutlineArrowCircleLeft
              className="text-3xl  text-neutral-500"
              onClick={() => setOpen(!open)}
            />
          </>
        ) : (
          <MdOutlineArrowCircleRight
            className="text-3xl  text-orange-500"
            onClick={() => setOpen(!open)}
          />
        )}
      </div>
      {DASHBOARD_SIDEBAR_LINKS.map((item) => (
        <SidebarLink key={item.key} item={item} open={open} />
      ))}
    </div>
  );
}
interface SidebarLinkProps {
  item: {
    key: string;
    label: string;
    path: string;
    icon: JSX.Element;
  };
  open: boolean;
}

function SidebarLink({ item, open }: SidebarLinkProps) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={`${
        pathname === item.path
          ? "bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl px-3 py-2"
          : "text-neutral-400"
      } ${open ? linkClass : linkClassWithPx}`}
    >
      <span
        className={`${
          pathname === item.path ? "text-white text-lg" : "text-black text-lg"
        } ${open ? "text-lg" : "text-2xl"}`}
      >
        {item.icon}
      </span>
      <div
        className={`${
          pathname === item.path
            ? "text-white text-lg font-normal whitespace-pre duration-500"
            : "text-black text-lg font-normal whitespace-pre duration-500"
        } ${
          !open &&
          "opacity-0 translate-x-28 overflow-hidden whitespace-pre duration-500"
        }`}
      >
        {item.label}
      </div>
    </Link>
  );
}

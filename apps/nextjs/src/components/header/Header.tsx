import React from "react";
import { Nav } from "~/components/header/Menu";
import Link from "next/link";
import { MobileNav } from "./MobileNav";

const Header = () => {
  return (
    <div className="flex h-16 items-center  border-b px-4 ">
      <div>
        <MobileNav />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className=" text-lg font-bold lg:text-2xl mr-4">
            <Link href={"/"}>🌊 Springshed</Link>
          </div>
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Header;

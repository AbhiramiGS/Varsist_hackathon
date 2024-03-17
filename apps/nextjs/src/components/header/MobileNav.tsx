"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export function MobileNav() {
  return (
    <div className="">
      {/* {SHEET_SIDES.map((side) => ( */}
      <Sheet>
        <div className="flex p-1 lg:hidden">
          <SheetTrigger asChild>
            <div className={` rounded-md border p-2`}>
              <Menu className="h-4 w-4 text-black dark:text-white" />
            </div>
          </SheetTrigger>
        </div>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>SpringSense</SheetTitle>
            <SheetDescription>Spring Shed Management System</SheetDescription>
          </SheetHeader>
          {/* <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div> */}
          <div>
            <ul className="text-md mt-10 flex flex-col space-y-2 text-black dark:text-white">
              <li>
                <Link href="/">
                  <Button className="w-full" variant={"outline"}>
                    Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <Button className="w-full" variant={"outline"}>
                    Dashboard
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <Button className="w-full" variant={"outline"}>
                    About
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
      {/* ))} */}
    </div>
  );
}

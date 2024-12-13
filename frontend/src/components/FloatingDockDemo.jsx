import FloatingDock from "./ui/floating-dock";

import { IoReceiptOutline } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiGift } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Money Gift",
      icon: <BiMoneyWithdraw className="h-full w-full text-black " />,
      href: "#",
    },

    {
      title: "Wishlist",
      icon: <CiGift className="h-full w-full text-black " />,
      href: "#",
    },
    {
      title: "RSVP",
      icon: <IoReceiptOutline className="h-full w-full text-black " />,
      href: "#",
    },
    {
      title: "Contact",
      icon: <MdOutlineLocalPhone className="h-full w-full text-black " />,
      href: "#",
    },
    {
      title: "Location",
      icon: <SlLocationPin className="h-full w-full text-gray-500 " />,
      href: "#",
    },
    {
      title: "Calendar",
      icon: <FaRegCalendarAlt className="h-full w-full text-black " />,
      href: "#",
    },
  ];
  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        // only for demo, remove for production
        mobileClassName="translate-y-20"
        items={links}
      />
    </div>
  );
}

import { IoReceiptOutline } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiGift } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

export const featureicons = [
    {
      icon: <IoReceiptOutline />,
      title: "RSVP",
      bgColor: "bg-red-200",
      textColor: "text-red-500",
      description: "Tetamu boleh menghantar status kehadiran kepada pihak majlis",
    },
    {
      icon: <BiMoneyWithdraw />,
      title: "Money Gift",
      bgColor: "bg-emerald-200",
      textColor: "text-emerald-500",
      description: "Terima wang tanpa tunai terus ke akaun bank anda",
    },
    {
      icon: <CiGift />,
      title: "Wishlist",
      bgColor: "bg-orange-200",
      textColor: "text-orange-500",
      description: "Terima hadiah idaman anda tanpa sebarang pertindihan.",
    },
    {
      icon: <MdOutlineLocalPhone />,
      title: "Contact",
      bgColor: "bg-yellow-200",
      textColor: "text-yellow-500",
      description: "Hubungi tuan rumah melalui telefon atau WhatsApp"
    },
    {
      icon: <SlLocationPin />,
      title: "Location",
      bgColor: "bg-fuchsia-200",
      textColor: "text-fuchsia-500",
      description: "Penunjuk arah menggunakan aplikasi Google Maps atau Waze"
    },
    {
      icon: <FaMusic />,
      title: "Music",
      bgColor: "bg-pink-200",
      textColor: "text-pink-500",
      description: "Pelbagai pilihan lagu dijadikan untuk musik latar belakang",
    },
    {
      icon: <FaRegCalendarAlt />,
      title: "Calendar",
      bgColor: "bg-gray-200",
      textColor: "text-gray-500",
      description:"Simpan tarikh majlis sebagai peringatan di aplikasi kalendar." ,
    },
    {
      icon: <FaBookOpen />,
      title: "Guestbook",
      bgColor: "bg-cyan-200",
      textColor: "text-cyan-500",
      description: "Ruangan untuk tetamu menyampaikan ucapan",
    },
  ];


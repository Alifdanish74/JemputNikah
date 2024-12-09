// import { IoReceiptOutline } from "react-icons/io5";
// import { BiMoneyWithdraw } from "react-icons/bi";
// import { CiGift } from "react-icons/ci";
// import { MdOutlineLocalPhone } from "react-icons/md";
// import { SlLocationPin } from "react-icons/sl";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { FaMusic } from "react-icons/fa";
// import { FaBookOpen } from "react-icons/fa";
import { AnimatedTooltip } from "./ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "RSVP",
    designation: "Hantar Status Kehadiran",
    image: "https://cdn-icons-png.flaticon.com/512/7396/7396834.png",
    // <IoReceiptOutline />,
  },
  {
    id: 2,
    name: "Money Gift",
    designation: "Terima Wang Tanpa Tunai",
    image:
      "https://cdn-icons-png.flaticon.com/512/3146/3146451.png"
  },
  {
    id: 3,
    name: "Wishlist",
    designation: "Terima Hadiah Idaman Anda",
    image:
      "https://img.favpng.com/7/9/18/gift-vector-graphics-wish-list-computer-icons-shopping-png-favpng-eKXy20irGGfjijM6LB2fYyjvL.jpg"
  },
  {
    id: 4,
    name: "Contact",
    designation: "Hubungi Pihak Majlis",
    image:
      "https://media.gettyimages.com/id/971654072/vector/red-call-icon.jpg?s=612x612&w=gi&k=20&c=nFqQl2tmYsU8izqlGWiKBv-M3Vcp8Dy-i9QjF3rxkwg="
  },
  {
    id: 5,
    name: "Location",
    designation: "Petunjuk Arah ke Lokasi Majlis",
    image:
     "https://cdn-icons-png.flaticon.com/512/535/535137.png"
  },
  {
    id: 6,
    name: "Music",
    designation: "Pilih Lagu Latar Belakang",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/1200px-Apple_Music_icon.svg.png"
  },
  {
    id: 7,
    name: "Calendar",
    designation: "Simpan Tarikh Majlis",
    image:
      "https://img.freepik.com/premium-vector/vector-calendar-icon-flat-calendar-vector-white-background_874723-114.jpg"
  },
  {
    id: 8,
    name: "Guestbook",
    designation: "Ruang Ucapan dari Tetamu",
    image:
      "https://t4.ftcdn.net/jpg/10/82/74/05/360_F_1082740576_0VBxBa5nHsNTkXjqqt1yhREBuI3KcPHT.jpg"
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}

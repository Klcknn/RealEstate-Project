import { AiOutlineEye } from 'react-icons/ai';
import { IoIosImages } from "react-icons/io";
import { CiFloppyDisk } from "react-icons/ci";
import { PiUserFocusFill, PiCameraSlashBold, PiEnvelopeOpenLight } from "react-icons/pi";
import { HiOutlineIdentification, HiOutlineListBullet, HiOutlineHeart, HiOutlineMagnifyingGlass, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { MdOutlineMobileFriendly } from "react-icons/md";


export const sideContent = {
  profilePhoto: [
    {
      row: 1,
      icon: <IoIosImages className="icon" size={25} />,
      iconStyle: { color: "#16339c" },
      text: "Only images (JPEG, PNG)",
    },
    {
      row: 2,
      icon: <CiFloppyDisk className="icon" size={25} />,
      text: "Maximum 3MB size allowed",
    },
    {
      row: 3,
      icon: <PiUserFocusFill className="icon" size={25} />,
      iconStyle: { color: "#5a9c44" },
      text: "Clear and recognizable photos only",
    },
    {
      row: 4,
      icon: <AiOutlineEye className="icon" size={25} />,
      text: "Select file, crop, preview then save",
    },
    {
      row: 5,
      icon: <PiCameraSlashBold className="icon" size={25} />,
      iconStyle: { color: "#c21d1d" },
      text: "If you don't want the photo, remove it",
    },
  ],
  profileForm: [
    {
      row: 1,
      icon: <HiOutlineIdentification className="icon" size={25} />,
      text: "Prefer your real name / lastname",
    },
    {
      row: 2,
      icon: <MdOutlineMobileFriendly className="icon" size={25} />,
      iconStyle: { color: "#5a9c44" },
      text: "Your active phone number",
    },
    {
      row: 3,
      icon: <PiEnvelopeOpenLight className="icon" size={25} />,
      iconStyle: { color: "#c21d1d" },
      text: "Actively used email address",
    },
  ],
  authForm: [
    {
      row: 1,
      icon: <HiOutlineListBullet className="icon" size={25} />,
      text: "List and manage property ads",
    },
    {
      row: 2,
      icon: <HiOutlineHeart className="icon" size={25} />,
      iconStyle: { color: "#c21d1d" },
      text: "Easily favorite and access ads",
    },
    {
      row: 3,
      icon: <HiOutlineMagnifyingGlass className="icon" size={25} />,
      text: "Search, filter, and explore listings",
    },
    {
      row: 4,
      icon: <HiOutlineChatBubbleLeftRight className="icon" size={25} />,
      iconStyle: { color: "#5a9c44" },
      text: "Send tour request to property owners",
    },
  ],

}
import Link from "next/link";
import FriendInfo from "./FriendInfo";
import Card from "./Card";

export default function ProfilFriendsCard() {
  return (
    <Card noPadding={true}>
      <h2 className="text-3xl px-5 py-3">Friends</h2>
      <div className="px-5 -mt-2">
        <Link href={"/"}>
          <div className="border-b border-gray-100 p-4 -mx-4">
            <FriendInfo />
          </div>
        </Link>
        <Link href={"/"}>
          <div className="border-b border-gray-100 p-4 -mx-4">
            <FriendInfo />
          </div>
        </Link>
        <Link href={"/"}>
          <div className="border-b border-gray-100 p-4 -mx-4">
            <FriendInfo />
          </div>
        </Link>
        <Link href={"/"}>
          <div className="border-b border-gray-100 p-4 -mx-4">
            <FriendInfo />
          </div>
        </Link>
        <Link href={"/"}>
          <div className="border-b border-gray-100 p-4 -mx-4">
            <FriendInfo />
          </div>
        </Link>
        <Link href={"/"}>
          <div className="border-b border-gray-100 p-4 -mx-4">
            <FriendInfo />
          </div>
        </Link>
        <Link href={"/"}>
          <div className="border-b border-gray-100 p-4 -mx-4">
            <FriendInfo />
          </div>
        </Link>
      </div>
    </Card>
  );
}

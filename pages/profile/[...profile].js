import PostCard from "@/components/PostCard";
import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
import ProfilePageLayout from "@/components/ProfilePageLayout";
import { useRouter } from "next/router";
import FriendInfo from "@/components/FriendInfo";
import Link from "next/link";

const ProfileRouterPages = () => {
  const router = useRouter();
  const { asPath: pathname } = router;
  const isAbout = pathname === "/profile/about";
  const isFriends = pathname === "/profile/friends";
  const isPhotos = pathname === "/profile/photos";
  return (
    <ProfilePageLayout pathname={pathname}>
      {isFriends && (
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
      )}
      {isAbout && (
        <Card>
          <h2 className="text-3xl mb-2">About me</h2>
          <p className="mb-2 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            facere architecto dolor ex perspiciatis molestias. Accusamus
            recusandae alias, tempore eveniet eligendi ab eum? Voluptatibus
            ipsam illo non, reprehenderit accusantium tempore?
          </p>
          <p className="mb-2 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            facere architecto dolor ex perspiciatis molestias. Accusamus
            recusandae alias, tempore eveniet eligendi ab eum? Voluptatibus
            ipsam illo non, reprehenderit accusantium tempore?
          </p>
        </Card>
      )}
      {isPhotos && (
        <Card>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md justify-center">
              <img
                src="https://images.unsplash.com/photo-1736319551652-4378fc7f9502?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
                alt=""
              />
            </div>
            <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md justify-center">
              <img
                src="https://images.unsplash.com/photo-1735657061829-fc1b934035f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md justify-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1736246143958-ca36c5cf29bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md justify-center">
              <img
                src="https://media.istockphoto.com/id/171101830/photo/oia-sunset-santorini-greece.webp?a=1&b=1&s=612x612&w=0&k=20&c=lDkUWtImDzApz8-wxPwt9YguiJr7qE_JTHpA3XyTud8="
                alt=""
              />
            </div>
          </div>
        </Card>
      )}
    </ProfilePageLayout>
  );
};

export default ProfileRouterPages;

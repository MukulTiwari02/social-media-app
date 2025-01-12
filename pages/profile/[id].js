import { useRouter } from "next/router";
import ProfilePage from "../profile";
import UserPosts from "@/components/UserPosts";

export default function UserProfile() {
  const router = useRouter();
  const userId = router.query.id;

  if(userId==='about'||userId==='photos'||userId==='friends' || userId==='posts')
  return <ProfilePage />;

  else return <ProfilePage>
    <UserPosts userId={userId} />
  </ProfilePage>
}
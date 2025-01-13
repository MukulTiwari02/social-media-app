import ProfileAboutCard from "@/components/ProfileAboutCard";
import ProfilFriendsCard from "@/components/ProfileFriendsCard";
import ProfilePhotosCard from "@/components/ProfilePhotosCard";
import ProfilePage from "@/pages/profile";
import { useRouter } from "next/router";

export default function ProfileSubpages() {
  const router = useRouter();
  const tab = router.query?.tab?.length ? router.query?.tab[0] : "";
  return (
    <ProfilePage>
      {tab === "about" && <ProfileAboutCard />}
      {tab === "friends" && <ProfilFriendsCard />}
      {tab === "photos" && <ProfilePhotosCard />}
    </ProfilePage>
  );
}

import ProfilePageLayout from "@/components/ProfilePageLayout";
import { UserContextProvider } from "@/context/UserContext";
import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProfilePage({children}) {
  const [profile, setProfile] = useState(null);
  const supabase = createClient();
  const router = useRouter();
  const tab = router.query?.tab?.length ? router.query?.tab[0] : "";
  const userId = router.query.id;
  const [currentUser, setCurrentUser] = useState(null);
  const session = supabase.auth.getUser();
  const [isMyUser, setIsMyUser] = useState(false);

  useEffect(() => {
    setIsMyUser(currentUser?.id === profile?.id);
    if ((!userId || userId==='about'||userId==='photos'||userId==='friends' || userId==='posts') && currentUser) {
      if(!userId)
      router.push("/profile/" + currentUser?.id);
    else router.push(`/profile/${currentUser?.id}/${userId}`)
    }
  }, [profile, currentUser]);

  useEffect(() => {
    const thisSession = session.then((data) => {
      setCurrentUser(data.data.user);
    });
  }, []);

  function fetchProfile() {
    const profilefetching = supabase
      .from("profiles")
      .select()
      .eq("id", userId)
      .then((result) => {
        if (!result.error && result.data.length > 0) {
          setProfile(result?.data[0]);
        }
      });
  }

  useEffect(() => {
    if (!userId) return;
    fetchProfile();
  }, [userId]);

  return (
    userId && <UserContextProvider ><ProfilePageLayout
      onChange={fetchProfile}
      userProfile={profile}
      isMyUser={isMyUser}
    >{children}</ProfilePageLayout></UserContextProvider>
  );
}

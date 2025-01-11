import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import ProfilePageLayout from "@/components/ProfilePageLayout";
import { createClient } from "@/utils/supabase/component";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const supabase = createClient();
  const router = useRouter();
  const userId = router.query.id;
  const [currentUser, setCurrentUser] = useState(null);
  const session = supabase.auth.getUser();
  const [isMyUser, setIsMyUser] = useState(false);

  useEffect(() => {
    setIsMyUser(currentUser?.id === profile?.id);
  }, [profile, currentUser]);

  useEffect(() => {
    const thisSession = session.then((data) => {
      setCurrentUser(data.data.user);
    });
  }, []);

  function fetchProfile(){
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
    <ProfilePageLayout
      onChange={fetchProfile}
      userProfile={profile}
      isMyUser={isMyUser}
    ></ProfilePageLayout>
  );
}

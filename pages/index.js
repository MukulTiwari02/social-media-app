import { Geist, Geist_Mono } from "next/font/google";
import Layout from "@/components/Layout";
import PostFormCard from "@/components/PostFormCard";
import PostCard from "@/components/PostCard";
import LoginPage from "./login";
import { createClient } from "@/utils/supabase/component";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const supabase = createClient();
  const session = supabase.auth.getUser();

  useEffect(() => {
    const thisSession = session.then((data) => {
      setUser(data.data.user);
      if (!data.error) {
        const profilefetching = supabase
          .from("profiles")
          .select()
          .eq("id", data.data.user?.id)
          .then((result) => setProfile(result?.data[0]));
      }
    });
    fetchPosts();
  }, []);

  if (!user) return <LoginPage />;

  function fetchPosts() {
    const fetchPosts = supabase
      .from("posts")
      .select("id, created_at,content,photos,profiles(id,avatar,name)")
      .order("created_at", { ascending: false })
      .then((data) => setPosts(data.data));
  }

  return (
    <Layout>
      <UserContext.Provider value={profile}>
        {user && profile && <PostFormCard onPost={fetchPosts} />}
        {posts?.length > 0 &&
          posts.map((post) => (
            <PostCard key={post.created_at} post={post} />
          ))}
      </UserContext.Provider>
    </Layout>
  );
}

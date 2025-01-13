import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import LoginPage from "./login";
import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/component";
import { UserContext } from "@/context/UserContext";

const SavedPostsPage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);
  const router = useRouter();
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
      else router.push('/login')
    });
    fetchSavedPosts();
  }, []);

  function fetchSavedPosts() {
    const fetchPosts = supabase
      .from("saved")
      .select("id, created_at,post_id,user_id, posts(id, created_at,content,photos,profiles(id,avatar,name))")
      .order("created_at", { ascending: false })
      .then((data) => setSavedPosts(data.data));
  }


  return (
    <Layout>
      <UserContext.Provider value={profile}>
      <h1 className="text-4xl md:text-6xl mb-4 text-gray-300">
        Your Saved Posts
      </h1>
      {profile && savedPosts.length > 0 && savedPosts.map(post => <PostCard key={post.posts.created_at} post={post.posts}/>)}
      {savedPosts.length == 0 && <h2>No saved posts.</h2>}
      </UserContext.Provider>
    </Layout>
  );
};

export default SavedPostsPage;

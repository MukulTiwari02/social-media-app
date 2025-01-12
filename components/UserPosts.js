import { createClient } from "@/utils/supabase/component"
import { useEffect, useState } from "react"
import PostCard from "./PostCard";

export default function UserPosts({userId}){
    const [posts, setPosts] = useState([]);
    const supabase = createClient();
    useEffect(() => {
        supabase.from('posts').select("id, created_at,content,photos,profiles(id,avatar,name)").order("created_at", { ascending: false }).eq('author', userId).then((data) => setPosts(data.data));
    })

    return <div>
        {posts?.length > 0 &&
          posts.map((post) => (
            <PostCard key={post.created_at} post={post} />
          ))}
    </div>
}
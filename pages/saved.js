import Layout from "@/components/Layout"
import PostCard from "@/components/PostCard"

const SavedPostsPage = () => {
  return (
    <Layout>
        <h1 className="text-4xl md:text-6xl mb-4 text-gray-300">Your Saved Posts</h1>
        <PostCard />
        <PostCard />
    </Layout>
  )
}

export default SavedPostsPage
import { Geist, Geist_Mono } from "next/font/google";
import Layout from "@/components/Layout";
import PostFormCard from "@/components/PostFormCard";
import PostCard from "@/components/PostCard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <Layout>
      <PostFormCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </Layout>
  );
}

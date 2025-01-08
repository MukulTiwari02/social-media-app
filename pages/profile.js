import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import ProfilePageLayout from "@/components/ProfilePageLayout";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <ProfilePageLayout pathname={pathname}>
      <PostCard />
      <PostCard />
    </ProfilePageLayout>
  );
}

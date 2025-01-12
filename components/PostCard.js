import Card from "./Card";
import Avatar from "./Avatar";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import { UserContext } from "@/context/UserContext";
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";
import { createClient } from "@/utils/supabase/component";
const PostCard = ({ post }) => {
  const supabase = createClient();
  const [optionsVisible, setOptionsVisible] = useState(false);
  const profile = useContext(UserContext);
  const [postLikes, setPostLikes] = useState([]);

  useEffect(() => {
    fetchLikes();
  }, [profile]);

  function fetchLikes() {
    if (profile)
      supabase
        .from("likes")
        .select()
        .eq("post_id", post.id)
        .eq("user_id", profile.id)
        .then((result) => setPostLikes(result.data));
  }

  const isLikedByMe = !!postLikes.find((like) => like.user_id === profile.id);
  console.log(isLikedByMe, postLikes);

  async function toggleLike() {
    if (isLikedByMe) {
      const response = await supabase
        .from("likes")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", profile.id)
        .then(() => fetchLikes());
      return;
    }

    const response = await supabase
      .from("likes")
      .insert({
        post_id: post.id,
        user_id: profile.id,
      })
      .then(() => fetchLikes());
  }

  return (
    <Card>
      <div className="flex gap-3">
        <div>
          <Link href={"/profile/" + post.profiles.id}>
            <Avatar url={post?.profiles.avatar} />
          </Link>
        </div>
        <div className="grow">
          <p>
            <Link href={"/profile/" + post.profiles.id}>
              <span className="font-semibold hover:underline cursor-pointer">
                {post?.profiles.name}
              </span>
            </Link>{" "}
            shared a post.
          </p>
          <p className="text-gray-500 text-sm">
            <ReactTimeAgo date={new Date(post?.created_at).getTime()} />
          </p>
        </div>
        <div>
          <button
            className="text-gray-600"
            onClick={() => setOptionsVisible(!optionsVisible)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
          {
            <div
              className={
                (optionsVisible ? "opacity-100" : "opacity-0") +
                ` relative transition-all`
              }
            >
              <div className="absolute -right-4 bg-white shadow-md shadow-gray-300 p-3 rounded-sm border border-gray-100 w-[210px] text-gray-700">
                <a className="flex py-2 px-2 items-center gap-2 hover:bg-socialBlue hover:bg-opacity-90 hover:text-white hover:scale-110 hover:shadow-md shadow-gray-300 hover:scsale-125 transition-all rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                  Save post
                </a>
                <a className="flex py-2 px-2 items-center gap-2 hover:bg-socialBlue hover:bg-opacity-90 hover:text-white hover:scale-110 hover:shadow-md shadow-gray-300 hover:scsale-125 transition-all rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                    />
                  </svg>
                  Turn notifications
                </a>
                <a className="flex py-2 px-2 items-center gap-2 hover:bg-socialBlue hover:bg-opacity-90 hover:text-white hover:scale-110 hover:shadow-md shadow-gray-300 hover:scsale-125 transition-all rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                  Hide post
                </a>
                <a className="flex py-2 px-2 items-center gap-2 hover:bg-socialBlue hover:bg-opacity-90 hover:text-white hover:scale-110 hover:shadow-md shadow-gray-300 hover:scsale-125 transition-all rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  Delete
                </a>
                <a className="flex py-2 px-2 items-center gap-2 hover:bg-socialBlue hover:bg-opacity-90 hover:text-white hover:scale-110 hover:shadow-md shadow-gray-300 hover:scsale-125 transition-all rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                    />
                  </svg>
                  Report
                </a>
              </div>
            </div>
          }
        </div>
      </div>
      <div>
        <p className="my-4 text-sm">{post?.content}</p>
        <div className="bg-gray-100 rounded-md overflow-hidden">
          {post.photos.length > 0 && (
            <div className="flex gap-4 flex-wrap items-center justify-center">
              <Carousel showThumbs={false} emulateTouch={true}>
                {post.photos.map((photoUrl) => (
                  <div className="flex items-center justify-center h-full w-full">
                    <img
                      className="object-contain select-none"
                      src={photoUrl}
                      alt=""
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 flex gap-8">
        <button onClick={toggleLike} className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={"size-6" + (isLikedByMe ? " fill-red-500" : "")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          {postLikes?.length}
        </button>
        <button className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
          12
        </button>
        <button className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
          3
        </button>
      </div>
      <div className="flex mt-4 gap-2">
        <div>
          <Avatar url={profile?.avatar} />{" "}
        </div>
        <div className="border grow relative rounded-full">
          <textarea
            className="block overflow-hidden w-full resize-none p-3 px-4 h-12 rounded-full"
            name=""
            id=""
            placeholder="Leave a comment"
          ></textarea>
          <button className="absolute top-3 right-3 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;

import Link from "next/link";
import Avatar from "./Avatar";
import ReactTimeAgo from "react-time-ago";

export default function Comment({ comment }) {
  return (
    <div className="flex gap-2 items-center mt-2">
      <Link href={"/profile/" + comment.profiles.id}>
        <Avatar size="sm" url={comment.profiles.avatar} />
      </Link>
      <div className="bg-gray-200 py-2 px-4 rounded-3xl">
        <div className="flex gap-1 items-center">
          <Link
            className="font-semibold hover:underline cursor-pointer text-sm"
            href={"/profile/" + comment.profiles.id}
          >
            {comment.profiles.name}
          </Link>
          <p className="text-gray-400 text-xs">
            <ReactTimeAgo timeStyle={'twitter'} date={new Date(comment.created_at).getTime()} />
          </p>
        </div>
        <p className="text-sm leading-4">{comment.content}</p>
      </div>
    </div>
  );
}

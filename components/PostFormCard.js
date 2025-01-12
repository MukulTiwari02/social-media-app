import Card from "./Card";
import Avatar from "./Avatar";
import { useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/component";
import { UserContext } from "@/context/UserContext";
import { SyncLoader } from "react-spinners";

const PostFormCard = ({ onPost }) => {
  const [content, setContent] = useState("");
  const supabase = createClient();
  const [uploads, setUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false)
  let photosUrl = [];

  const profile = useContext(UserContext);

  async function uploadPhotos() {
    for (let index in uploads) {
      const photoFile = uploads[index];
      const newName = Date.now() + photoFile.name;
      await supabase.storage
        .from("photos")
        .upload(newName, photoFile)
        .then((result) => {
          const url =
            process.env.NEXT_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/photos/" +
            encodeURIComponent(result.data.path);
          photosUrl = [...photosUrl, url];
        });
    }
  }

  async function sharePost() {
    setIsUploading(true);
    await uploadPhotos();
    supabase
      .from("posts")
      .insert({
        author: profile.id,
        content,
        photos:photosUrl
      })
      .then((response) => {
        if (!response.error) {
          setContent("");
          setUploads([]);
          photosUrl = [];
          setIsUploading(false);
          if (onPost) onPost();
        }
      });
  }

  function removeCurrentImage(image) {
    const newUploads = uploads.filter((file) => file != image);
    setUploads(newUploads);
  }

  function selectUploads(e) {
    const newFiles = Array.from(e.target.files);
    if (uploads.length + newFiles.length <= 10) {
      const prevUploads = [...new Set(uploads.concat(newFiles))];
      setUploads(prevUploads);
    } else {
      alert("Can upload only a maximum of 10 images.");
      return;
    }
  }

  return (
    <Card>
      <div className="flex gap-2">
        <div>
          <Avatar url={profile?.avatar} />
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="grow p-3 h-14 resize-none"
          name=""
          id=""
          placeholder={`Whats on your mind? ${profile?.name.split(" ")[0]}!`}
        ></textarea>
      </div>
      {uploads && (
        <div className="mt-2 flex gap-2 flex-wrap">
          {uploads.map((upload) => (
            <div className="h-24 rounded-md overflow-hidden relative">
              <button
                onClick={() => removeCurrentImage(upload)}
                className="absolute right-2 top-2 text-gray-300 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm4-7a.75.75 0 0 0-.75-.75h-6.5a.75.75 0 0 0 0 1.5h6.5A.75.75 0 0 0 12 8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <img
                className="h-full w-auto"
                src={URL.createObjectURL(upload)}
                alt=""
              />
            </div>
          ))}
        </div>
      )
      }
      {isUploading && <h1 className="mt-2 p-2"><SyncLoader size={8}  color="black" /></h1>}
      <div className="flex gap-5 mt-2 items-center flex-wrap">
        <div>
          <label className="flex gap-1 cursor-pointer">
            <input
              multiple
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => selectUploads(e)}
              className="hidden"
              type="file"
              name="uploadPhotos"
              id="uploadPhotos"
            />
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
            <span className="hidden md:block">Add Photos</span>
          </label>
        </div>
        <div>
          <button className="flex gap-1">
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
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            <span className="hidden md:block">People</span>
          </button>
        </div>
        <div>
          <button className="flex gap-1">
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
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span className="hidden md:block">Check-In</span>
          </button>
        </div>
        <div>
          <button className="flex gap-1">
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
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
            <span className="hidden md:block">Mood</span>
          </button>
        </div>
        <div className="grow text-right">
          <button
            onClick={sharePost}
            className="bg-socialBlue px-4 py-1 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PostFormCard;

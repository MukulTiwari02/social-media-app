import { uploadUserProfileImage } from "@/helpers/user";
import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";
import { useState } from "react";
import { DotLoader, FadeLoader, HashLoader, PropagateLoader, PuffLoader, RingLoader } from "react-spinners";

const Avatar = ({ size, url, onChange, editable }) => {
  const classNameSmall = "rounded-full relative ";
  let width = size === "lg" ? "w-24 md:w-36" : (size ==='sm' ? "w-9 h-9" : "w-12");
  const router = useRouter();
  const id = router?.query?.id;
  const supabase = createClient();
  const [imageUrl, setImageUrl] = useState(null);
  const [avatarImageFile, setAvatarImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  function changeAvatar(e) {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setAvatarImageFile(e.target.files[0]);
  }

  function cancelSelection() {
    setImageUrl(null);
    setAvatarImageFile(null);
  }

  async function uploadAvatarImage() {
    setIsUploading(true);
    await uploadUserProfileImage(
      supabase,
      avatarImageFile,
      "avatars",
      id,
      "avatar"
    );
    setIsUploading(false);
    setImageUrl(null);
    setAvatarImageFile(null);
    if (onChange) onChange();
  }

  return (
    <div className={classNameSmall + width}>
      {editable && imageUrl && (
        <div className="rounded-full absolute inset-0 bg-white bg-opacity-40"></div>
      )}
      {isUploading && (
        <div className="rounded-full absolute inset-0 bg-white bg-opacity-40 flex items-center justify-center">
          <div className="inline-block mx-auto bg-opacity-85">
            <PuffLoader color="gray" size={40} /> 
          </div>
        </div>
      )}
      {editable && imageUrl && !isUploading && (
        <div className="absolute bottom-[8%] left-[13%] md:top-[60%] md:left-[20%] m-2 flex gap-2">
          <button
            onClick={uploadAvatarImage}
            className="flex gap-2 text-sm items-center bg-gray-400 opacity-90 hover:opacity-100 p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-2 md:h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </button>
          <button
            onClick={cancelSelection}
            className="flex gap-2 text-sm items-center bg-gray-400 opacity-90 hover:opacity-100 p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-2 md:h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {editable && !imageUrl && (
        <label className="absolute top-[60%] left-[60%] md:left-[65%] md:top-[65%] m-2 shadow-md shadow-gray-100 cursor-pointer flex gap-2 text-sm items-center border justify-center border-gray-200 bg-gray-50 opacity-80 hover:opacity-90 p-1 md:p-2 rounded-full">
          <input
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => changeAvatar(e)}
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
            className="h-4 md:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            />
          </svg>
        </label>
      )}
      <img
        className="aspect-square w-full h-full rounded-full object-cover"
        src={imageUrl || url}
        alt=""
      />
    </div>
  );
};

export default Avatar;

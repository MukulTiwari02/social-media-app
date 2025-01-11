import { uploadUserProfileImage } from "@/helpers/user";
import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";
import { useState } from "react";
import { HashLoader, PulseLoader } from "react-spinners";

export default function Cover({ url, editable, onChange }) {
  const router = useRouter();
  const id = router?.query?.id;
  const supabase = createClient();
  const [imageUrl, setImageUrl] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  function changeCover(e) {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setCoverImageFile(e.target.files[0]);
  }

  function cancelSelection() {
    setImageUrl(null);
    setCoverImageFile(null);
  }

  async function uploadCoverImage() {
    setIsUploading(true);
    await uploadUserProfileImage(
      supabase,
      coverImageFile,
      "covers",
      id,
      "coverImage"
    );
    setIsUploading(false);
    setImageUrl(null);
    setCoverImageFile(null);
    if (onChange) onChange();
  }

  return (
    <div className="w-full h-full items-center relative">
      <img
        className="w-full h-full object-cover"
        src={imageUrl || url}
        alt=""
      />
      {isUploading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center">
          <div className="inline-block mx-auto opacity-65">
            <PulseLoader color="gray" size={10} />
          </div>
        </div>
      )}
      {editable && imageUrl && (
        <div className="absolute bottom-0 right-0 m-2 flex gap-2">
          <button
            onClick={uploadCoverImage}
            className="flex gap-2 text-sm items-center bg-gray-300 opacity-80 hover:opacity-100 p-2 md:py-2 md:px-3 rounded-full md:rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>

            <span className="hidden md:block">Confirm</span>
          </button>
          <button
            onClick={cancelSelection}
            className="flex gap-2 text-sm items-center bg-gray-300 opacity-80 hover:opacity-100 p-2 md:py-2 md:px-3 rounded-full md:rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <span className="hidden md:block">Cancel</span>
          </button>
        </div>
      )}

      {editable && !imageUrl && (
        <label className="absolute bottom-0 right-0 shadow-sm shadow-gray-100 m-2 cursor-pointer flex gap-2 text-sm items-center bg-gray-200 opacity-80 hover:opacity-100 p-2 md:py-2 md:px-3 rounded-full md:rounded-md">
          <input
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => changeCover(e)}
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
            className="size-4"
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
          <span className="hidden md:block">Change cover image</span>
        </label>
      )}
    </div>
  );
}

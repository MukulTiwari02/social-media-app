import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
import Cover from "./Cover";
import { useState } from "react";
import { createClient } from "@/utils/supabase/component";
import ProfileTabs from "./ProfileTabs";

const ProfilePageLayout = ({ children, userProfile, isMyUser, onChange }) => {
  const [isEditingMode, setIsEditingMode] = useState(false);
  const supabase = createClient();
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");

  async function saveProfile() {
    await supabase
      .from("profiles")
      .update({
        name: name,
        place: place,
      })
      .eq("id", userProfile.id);
    if (onChange) onChange();
    setIsEditingMode(false);
  }

  return (
    <Layout isMyUser={isMyUser}>
      <Card noPadding={true}>
        <div className="relative overflow-hidden rounded-md">
          <div className="h-36 flex justify-center items-center overflow-hidden">
            <Cover
              onChange={onChange}
              url={userProfile?.coverImage}
              editable={isMyUser}
            />
          </div>
          <div className="absolute top-28 md:top-24 left-4">
            <Avatar
              onChange={onChange}
              url={userProfile?.avatar}
              size={"lg"}
              editable={isMyUser}
            />
          </div>
          <div className="p-3 md:pt-4 pb-0">
            <div className="ml-28 md:ml-40">
              <div className="flex ">
                {!isEditingMode && (
                  <div className="grow">
                    <h1 className="text-xl md:text-3xl font-bold">
                      {userProfile?.name}
                    </h1>
                    <div className="text-sm md:text-base text-gray-500 leading-4">
                      {userProfile?.place || "Internet"}
                    </div>
                  </div>
                )}
                {isMyUser && isEditingMode && (
                  <div className="grow">
                    <input
                      className="border-gray-500 block w-[150px] md:w-[200px] border rounded-md py-1 px-3"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="border-gray-500 block w-[150px] md:w-[200px] border rounded-md py-1 px-3 mt-1"
                      type="text"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                    />
                  </div>
                )}
                {isMyUser && !isEditingMode && (
                  <button
                    onClick={() => {
                      setIsEditingMode(true);
                      setName(userProfile?.name);
                      setPlace(userProfile?.place);
                    }}
                    className="p-2 md:py-2 md:px-3 h-8 flex gap-1 items-center justify-center rounded-full md:rounded-md shadow-lg bg-white shadow-gray-200 text-sm"
                  >
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    <span className="hidden md:block" >Edit Profile</span>
                  </button>
                )}
                <div className="flex flex-col gap-1">
                  {isMyUser && isEditingMode && (
                    <button
                      onClick={saveProfile}
                      className="p-2 md:py-2 md:px-3 h-8 flex gap-1 items-center rounded-full md:rounded-md shadow-lg bg-white shadow-gray-200 text-sm"
                    >
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
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="hidden md:block">Save Profile</span>
                    </button>
                  )}
                  {isMyUser && isEditingMode && (
                    <button
                      onClick={() => {
                        setIsEditingMode(false);
                      }}
                      className="p-2 md:py-2 md:px-3 h-8 flex gap-1 items-center rounded-full md:rounded-md shadow-lg bg-white shadow-gray-200 text-sm"
                    >
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
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="hidden md:block">Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <ProfileTabs />
          </div>
        </div>
      </Card>
      {children}
    </Layout>
  );
};

export default ProfilePageLayout;

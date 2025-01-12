import Card from "@/components/Card";
import Link from "next/link";
import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/component";

export default function NavigationCard({ isMyUser }) {
  const router = useRouter();
  const { asPath: pathname } = router;
  const isFriendsTab =
    router.query.tab && router.query?.tab[0] === "friends" && isMyUser;
  const isMyProfileTab = !router.query.tab && isMyUser;
  const supabase = createClient();

  async function logoutFunction() {
    const signout = await supabase.auth.signOut();
    router.push("/login");
  }

  const activeElementClasses =
    "-translate-y-2 md:translate-y-0 -my-7 md:my-2 items-center text- flex md:justify-start gap-4 md:py-4 bg-socialBlue md:-mx-10 md:px-10 md:text-white rounded-md md:shadow-md md:shadow-gray-300 justify-center";
  const nonActiveElementClasses =
    "-my-5 md:my-0 items-center flex justify-center md:justify-start gap-4 md:py-3 md:hover:bg-socialBlue md:hover:bg-opacity-40 hover:scale-110 md:hover:shadow-md md:shadow-gray-300 md:-mx-5 transition-all rounded-md md:px-5 md:my-2";
  return (
    <Card>
      <div className="-mx-5 md:mx-0 my-2 md:my-0 md:px-4 md:py-2 grid grid-cols-5 md:block">
        <h2 className="text-gray-400 md:mb-3 hidden md:block">Navigation</h2>
        <Link
          href="/"
          className={
            pathname === "/" || pathname === ""
              ? activeElementClasses
              : nonActiveElementClasses
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span className="hidden md:block">Home</span>
        </Link>
        <Link
          href="/profile"
          className={
            (isMyProfileTab ? activeElementClasses : nonActiveElementClasses) +
            " hidden md:flex "
          }
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
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <span className="hidden md:block">My Profile</span>
        </Link>
        <Link
          href="/profile/friends"
          className={
            isFriendsTab ? activeElementClasses : nonActiveElementClasses
          }
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
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>
          <span className="hidden md:block">Friends</span>
        </Link>
        <Link
          href="/saved"
          className={
            pathname === "/saved"
              ? activeElementClasses
              : nonActiveElementClasses
          }
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
          <span className="hidden md:block">Saved Posts</span>
        </Link>
        <Link
          href="notifications"
          className={
            pathname === "/notifications"
              ? activeElementClasses
              : nonActiveElementClasses
          }
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
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          <span className="hidden md:block">Notifications</span>
        </Link>
        <button
          onClick={logoutFunction}
          className="-my-5 items-center flex justify-center md:justify-start gap-4 md:py-3 hover:scale-105 md:-mx-5 transition-all rounded-md md:px-5 md:my-2"
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
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </Card>
  );
}

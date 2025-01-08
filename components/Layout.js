import NavigationCard from "./NavigationCard";
import PostCard from "./PostCard";
import PostFormCard from "./PostFormCard";

import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Layout = ({ children, hideNavigation }) => {
  let rightColumnClasses = "";

  if (hideNavigation) {
    rightColumnClasses += "w-full";
  } else {
    rightColumnClasses += "md:w-9/12";
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="mt-4 mx-4 flex md:flex-row flex-col-reverse max-w-4xl lg:mx-auto md:gap-6 mb-24 md:mb-0">
        {!hideNavigation && (
          <div className="md:w-3/12 fixed bottom-0 left-0 w-full z-10 md:static -mb-4">
            <NavigationCard />
          </div>
        )}
        <div className={rightColumnClasses}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
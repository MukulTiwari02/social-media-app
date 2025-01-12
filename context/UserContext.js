import { createClient } from "@/utils/supabase/component";

const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);

  const supabase = createClient();
  const session = supabase.auth.getUser();

  useEffect(() => {
    const thisSession = session.then((data) => {
      setUser(data.data.user);
    });
  }, []);

  useEffect(() => {
    if (user?.id) {
      supabase
        .from("profiles")
        .select()
        .eq("id", user?.id)
        .then((result) => setProfile(result?.data[0]));
    }
  }, [user]);

  return (
    <UserContext.Provider value={profile}>{children}</UserContext.Provider>
  );
}

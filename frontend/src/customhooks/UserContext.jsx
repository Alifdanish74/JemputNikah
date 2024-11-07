/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const location = useLocation();

  // Define public paths that don't require user profile data
  const publicPaths = ["/", "/register","/login"];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/auth/profile");
        setUser(data);
      } catch (err) {
        // If the error is 401, the user is not logged in; set ready to true
        if (err.response && err.response.status === 401) {
          console.warn("User is not authenticated.");
        } else {
          console.error("Error fetching profile:", err);
        }
      } finally {
        setReady(true); // Set ready to true regardless of success or error
      }
    };

    // Check if the current path is not in the public paths before fetching
    if (!publicPaths.includes(location.pathname) && !ready) {
      fetchProfile();
    } else {
      setReady(true);
    }
  }, [ready, location.pathname]);

  console.log("User data from UserContext:", user);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

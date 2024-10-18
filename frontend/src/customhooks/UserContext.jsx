import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);



  useEffect(() => {
    // Only fetch user data if the user is not logged in and ready is false
    if (!user && !ready) {
      axios.get('/api/auth/profile')
        .then(({ data }) => {
          
          setUser(data);
          setReady(true);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
          setReady(true);  // Mark as ready even if there's an error
        });
    }
    console.log("Ready", ready);
    console.log("User", user);
  }, [user, ready]);  // Re-run when `user` or `ready` changes

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

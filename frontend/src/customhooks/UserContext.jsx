/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage on initialization
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [ready, setReady] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize publicPaths to prevent recreation on each render
  const publicPaths = useMemo(
    () => [
      "/",
      "/register",
      "/login",
      "/tutorial",
      "/contact",
      "/pakej",
      "/weddingcardpreview",
      "/preview",
      "/weddingcard",
    ],
    []
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/auth/profile", {
          withCredentials: true, // Ensure cookies are sent
        });
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data)); // Save user to localStorage
      } catch (err) {
        if (err.response?.status === 401) {
          console.warn("User is not authenticated.");
          localStorage.removeItem("user"); // Clear user if not authenticated
          setUser(null);
          navigate("/login");
        } else if (err.response?.data?.code === "TOKEN_EXPIRED") {
          console.warn("Token has expired. Redirecting to login.");
          localStorage.removeItem("user");
          setUser(null);
          navigate("/login");
          window.location.reload(); // Reload the page
        } else {
          console.error("Error fetching profile:", err);
        }
      } finally {
        setReady(true); // Set ready to true once fetchProfile completes
      }
    };

    // Match dynamic paths like "/weddingcard/anything/anything"
    const isPublicPath =
      publicPaths.includes(location.pathname) ||
      location.pathname.startsWith("/weddingcard") ||
      location.pathname.startsWith("/weddingcardpreview") ||
      location.pathname.startsWith("/preview");

    // Only fetch profile if the path is not public and the user is not already set
    if (!isPublicPath && !user && !ready) {
      fetchProfile();
    } else {
      // If on a public path or user is already set, set ready to true
      setReady(true);
    }
  }, [user, ready, location.pathname, navigate, publicPaths]);

  console.log("User data from UserContext:", user, ready);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

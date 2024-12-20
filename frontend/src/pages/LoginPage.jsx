import axios from "axios";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../customhooks/UserContext";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import JemputKahwinLogo from "../assets/JemputKahwinLogo.png";
import { GoogleLogin } from "@react-oauth/google";
// import React from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility

  const { setUser } = useContext(UserContext);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  async function handleLoginUser(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      setUser(data);
      toast.success("Login successfull!", {
        autoClose: 500,
        position: "top-center",
        closeOnClick: true,
      });
      setRedirect(true);
    } catch (error) {
      const serverMessage =
        error.response?.data?.message || "Login failed. Please try again.";

      toast.error(serverMessage, {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      }); // Display toast error
    }
  }

  // Handle Google Login success
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse; // Token from Google
      // console.log("Google Credential:", credential); // Log for debugging
      const { data } = await axios.post("/api/auth/google-login", {
        token: credential,
      });
      console.log("Login Response:", data);
      setUser(data);
      toast.success("Google login successful!", {
        autoClose: 500,
        position: "top-center",
        closeOnClick: true,
      });
      setRedirect(true);
    } catch (error) {
      toast.error(
        "Google login failed. Please try again.",
        {
          autoClose: 2000,
          position: "top-center",
          closeOnClick: true,
        },
        error
      );
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <section className="bg-gray-50 h-screen dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:grid lg:grid-cols-12 lg:gap-20 lg:py-4">
          <div className="col-span-6 mr-auto hidden flex-col justify-between lg:flex xl:mb-0 lg:py-16">
            <div>
              <a
                href="/"
                className="mb-6 inline-flex items-center text-2xl font-semibold text-gray-900 dark:text-white lg:mb-10"
              >
                <img
                  className="mr-2 h-8 w-8"
                  src={JemputKahwinLogo}
                  alt="logo"
                />
                Jemput Kahwin
              </a>
              <div className="flex">
                <svg
                  className="mr-2 h-5 w-5 shrink-0 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Get started quickly
                  </h3>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Integrate with developer-friendly APIs or choose low-code.
                  </p>
                </div>
              </div>
              <div className="flex pt-8">
                <svg
                  className="mr-2 h-5 w-5 shrink-0 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Support any business model
                  </h3>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Host code that you dont want to share with the world in
                    private.
                  </p>
                </div>
              </div>
              <div className="flex pt-8">
                <svg
                  className="mr-2 h-5 w-5 shrink-0 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Join millions of businesses
                  </h3>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Flowbite is trusted by ambitious startups and enterprises of
                    every size.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6 text-center lg:hidden">
            <a
              href="#"
              className="inline-flex items-center text-2xl font-semibold text-gray-900 dark:text-white lg:hidden"
            >
              <img className="mr-2 h-8 w-8" src={JemputKahwinLogo} alt="logo" />
              Jemput Kahwin
            </a>
          </div>
          <div className="col-span-6 mx-auto w-full rounded-lg bg-white shadow dark:bg-gray-800 sm:max-w-lg md:mt-0 xl:p-0">
            <Card className="shadow-none">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-2xl">
                Log in
              </h1>
              <h3 className="text-gray-500">
                Log masuk untuk hasilkan kad kahwin digital anda!
              </h3>

              <div className="items-center justify-center space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() =>
                    toast.error("Google login failed. Please try again.", {
                      autoClose: 2000,
                      position: "top-center",
                      closeOnClick: true,
                    })
                  }
                  useOneTap
                  className="w-full"
                />
              </div>
              <div className="flex items-center">
                <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="px-5 text-center text-gray-500 dark:text-gray-400">
                  or
                </div>
                <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <form
                className="space-y-4 lg:space-y-6"
                action="#"
                onSubmit={handleLoginUser}
              >
                <div>
                  <Label htmlFor="email" className="mb-2 block dark:text-white">
                    Email
                  </Label>
                  <TextInput
                    id="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="password"
                    className="mb-2 block dark:text-white"
                  >
                    Password
                  </Label>
                  <div className="flex">
                    <TextInput
                      id="password"
                      placeholder="••••••••"
                      required
                      type={showPassword ? "text" : "password"} // Toggle type based on state
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-grow pr-5" // Add padding to avoid icon overlap
                    />
                    <button
                      type="button"
                      className=" flex items-center pr-3 text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <Button type="submit" color="blue" className="w-full">
                  Sign in to your account
                </Button>
                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Don’t have an account yet?&nbsp;
                    <a
                      href="/register"
                      className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                    >
                      Sign up here!
                    </a>
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;

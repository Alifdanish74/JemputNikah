import axios from "axios";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../customhooks/UserContext";
// import React from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLoginUser(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      console.error("Error", e);
      alert("Login failed. Please try again");
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
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
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                  alt="logo"
                />
                Jom Kahwin
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
              <img
                className="mr-2 h-8 w-8"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              Jemput Nikah
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

              <div className="items-center space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
                <a
                  href="#"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_13183_10121)">
                      <path
                        d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                        fill="#3F83F8"
                      />
                      <path
                        d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                        fill="#EA4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_13183_10121">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Login with Google
                </a>
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
                  <TextInput
                    id="password"
                    placeholder="••••••••"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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

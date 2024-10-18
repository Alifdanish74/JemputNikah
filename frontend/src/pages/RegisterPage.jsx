import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegisterUser(ev) {
    ev.preventDefault();

    if(name === "ADMIN"){
        setIsAdmin(true);
    }
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return; // Stop further execution if passwords don't match
    } else if (password === confirmPassword) {
      // call backend API to register user
      try {
        await axios.post("/api/auth/register", {
          name,
          email,
          phone,
          password,
          isAdmin
        });
        console.log("Registering User...");
        alert("Registration successful. Now you can login.");
        navigate("/login"); // Redirect to login page after successful registration
      } catch (e) {
        console.error("Error", e);
        alert("Registration failed. Please try again later.");
      }
    }
  }

  return (
    <div>
      <section className="bg-gray-50 ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:grid lg:grid-cols-12 lg:gap-20 lg:py-4">
          <div className="mr-auto hidden flex-col justify-between lg:col-span-5 lg:flex xl:col-span-6 xl:mb-0 lg:py-16">
            <div>
              <a
                href="#"
                className="mb-6 inline-flex items-center text-2xl font-semibold text-gray-900 "
              >
                <img
                  alt="logo"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                  className="mr-2 h-8 w-8"
                />
                Jemput Nikah
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
                  <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 ">
                    Get started quickly
                  </h3>
                  <p className="mb-2 text-gray-500 ">
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
                  <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 ">
                    Support any business model
                  </h3>
                  <p className="mb-2 text-gray-500 ">
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
                  <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 ">
                    Join millions of businesses
                  </h3>
                  <p className="mb-2 text-gray-500 ">
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
              className="inline-flex items-center text-2xl font-semibold text-gray-900  lg:hidden"
            >
              <img
                alt="logo"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                className="mr-2 h-8 w-8"
              />
              Flowbite
            </a>
          </div>
          <div className="mx-auto w-full rounded-lg bg-white shadow  sm:max-w-lg md:mt-0 lg:col-span-7 xl:col-span-6 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 lg:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  sm:text-2xl">
                Create your Free Account
              </h1>
              <div className="items-center space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
                <a
                  href="#"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200    "
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
                  Sign up with Google
                </a>
              </div>
              <div className="flex items-center">
                <div className="h-0.5 w-full bg-gray-200 "></div>
                <div className="px-5 text-center text-gray-500 ">or</div>
                <div className="h-0.5 w-full bg-gray-200 "></div>
              </div>
              <form
                className="space-y-4 lg:space-y-6"
                onSubmit={handleRegisterUser}
              >
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="name" className="">
                    Your name
                  </Label>
                  <TextInput
                    id="name"
                    name="name"
                    value={name}
                    placeholder="your name"
                    required
                    type="string"
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="email" className="">
                    Your email
                  </Label>
                  <TextInput
                    id="email"
                    name="email"
                    value={email}
                    placeholder="name@gmail.com"
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="phone" className="">
                    Your Contact
                  </Label>
                  <TextInput
                    id="phone"
                    name="phone"
                    placeholder=""
                    value={phone}
                    required
                    type="string"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="password" className="">
                    Password
                  </Label>
                  <TextInput
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="password" className="">
                    Confirm Password
                  </Label>
                  <TextInput
                    id="confirmPassword"
                    name="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    required
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {/* <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <Checkbox
                      aria-describedby="terms-social"
                      id="terms-social"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label
                      htmlFor="terms-social"
                      className="text-gray-500 "
                    >
                      By signing up, you are creating a Flowbite account, and
                      you agree to Flowbite’s&nbsp;
                      <a
                        className="font-medium text-primary-600 hover:underline "
                        href="#"
                      >
                        Terms of Use
                      </a>
                      &nbsp;and&nbsp;
                      <a
                        className="font-medium text-primary-600 hover:underline "
                        href="#"
                      >
                        Privacy Policy
                      </a>
                      .
                    </Label>
                  </div>
                </div> */}
                <Button type="submit" color="blue" className="w-full">
                  Create an account
                </Button>
                <p className="text-sm text-gray-900 ">
                  Already have an account?&nbsp;
                  <a
                    href="/login"
                    className="font-medium text-blue-600 hover:underline "
                  >
                    Sign in here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;

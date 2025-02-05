import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserContext } from "../customhooks/UserContext";
import { GoogleLogin } from "@react-oauth/google";
import JemputKahwinLogo from "../assets/JemputKahwinLogo.png";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility
  const [isAdmin, setIsAdmin] = useState(false); // Detect if name is "ADMIN"
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser } = useContext(UserContext);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const navigate = useNavigate();

  // Handle the registration form submission
  async function handleRegisterUser(ev) {
    ev.preventDefault();
    setErrorMessage(""); // Clear previous errors

    if (name.toUpperCase() === "ADMIN") {
      setIsAdmin(true);
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      toast.error("Passwords do not match.", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      }); // Display toast error
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters long.", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      }); // Display toast error
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        phone,
        password,
        isAdmin,
      });
      console.log(response + errorMessage);
      toast.success("Registration successful! You can now log in.", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
      navigate("/login");
    } catch (error) {
      const serverMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setErrorMessage(serverMessage); // Update errorMessage state
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
      <section className="bg-gray-50 ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:grid lg:grid-cols-12 lg:gap-20 lg:py-4">
          <div className="mr-auto hidden flex-col justify-between lg:col-span-5 lg:flex xl:col-span-6 xl:mb-0 lg:py-16">
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
                    Cipta Kad Kahwin Digital Anda Sekarang
                  </h3>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Rekabentuk elegan, mudah dihantar, dan pantas untuk jemputan
                    perkahwinan istimewa anda.
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
                    Kad Jemputan Digital, Kenangan Abadi
                  </h3>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Jemput tetamu dengan cara moden, pantas, dan mesra alam.
                    Daftar sekarang!
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
                    Jemputan Perkahwinan Lebih Mudah dan Bergaya
                  </h3>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Kad digital mudah, elegan, dan cepat dihantar. Log masuk
                    untuk bermula.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full rounded-lg bg-white shadow  sm:max-w-lg md:mt-0 lg:col-span-7 xl:col-span-6 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 lg:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  sm:text-2xl">
                Create your Free Account
              </h1>
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
                  <div className="flex">
                    <TextInput
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      type={showPassword ? "text" : "password"} // Toggle type based on state
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
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="password" className="">
                    Confirm Password
                  </Label>
                  <div className="flex">
                    <TextInput
                      id="confirmPassword"
                      name="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      required
                      type={showPassword ? "text" : "password"} // Toggle type based on state
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="flex-grow pr-5" // Add padding to avoid icon overlap
                    />
                    <button
                      type="button"
                      className="justify-end items-center pr-3 text-gray-500"
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

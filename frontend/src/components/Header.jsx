import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Dropdown } from "flowbite-react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  // Popover,
  // PopoverButton,
  PopoverGroup,
  // PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

import { UserContext } from "../customhooks/UserContext";
import axios from "axios";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function logoutUser() {
    await axios.post("/api/auth/logout");
    setUser(null);
    navigate("/");
  }

  function navigateTo(path) {
    navigate(path);
  }

  function navigateToLogin() {
    navigate("/login");
  }

  return (
    <header className="sticky z-10 top-0 bg-white border border-opacity-50 border-slate-400">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <NavLink to={"/"} className="-m-1.5 p-1.5 flex gap-2">
            <span className="sr-only">JemputNikah</span>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
            <span className="flex justify-center items-center text-lg text-gray-700">
              Jom Kahwin
            </span>
          </NavLink>
        </div>
        {/* Open left hamburger navbar when size < lg */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-8 w-8" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {/* Popover for product button start */}
          {/* <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-base font-semibold leading-6 text-gray-900">
              Product
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </PopoverButton> */}

          {/* Popover dropdown panel */}
          {/* <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-base leading-6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none text-gray-400"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover> */}
          {/* Popover for product button end */}

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-bold"
                : "text-gray-600 hover:text-gray-900"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/kad-digital"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-bold"
                : "text-gray-600 hover:text-gray-900"
            }
          >
            Kad Digital
          </NavLink>
          <NavLink
            to="/pakej"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-bold"
                : "text-gray-600 hover:text-gray-900"
            }
          >
            Pakej
          </NavLink>
          <NavLink
            to="/tutorial"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-bold"
                : "text-gray-600 hover:text-gray-900"
            }
          >
            Tutorial
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-bold"
                : "text-gray-600 hover:text-gray-900"
            }
          >
            Hubungi Kami
          </NavLink>
        </PopoverGroup>
        {/* Login button */}

        {user ? (
          user.isAdmin ? (
            // If the user is logged in and is an admin
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Dropdown color="blue" label={user.name} dismissOnClick={false}>
                <Dropdown.Item
                  href="/admin/upload"
                  className="hover:bg-blue-100 text-blue-700"
                >
                  Admin Dashboard
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={logoutUser}
                  className="hover:bg-red-100 text-red-700"
                >
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            // If the user is logged in but not an admin
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Dropdown color="blue" label={user.name} dismissOnClick={true}>
                <Dropdown.Item
                  onClick={() => navigateTo("/profile")}
                  className="hover:bg-blue-100 text-blue-700"
                >
                  PROFILE
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigateTo("/tempahan")}
                  className="hover:bg-blue-100 text-blue-700"
                >
                  REKOD TEMPAHAN
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={logoutUser}
                  className="hover:bg-red-100 text-red-700"
                >
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
          )
        ) : (
          // If no user is logged in, show login button
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button
              onClick={navigateToLogin}
              color="blue"
              className="rounded-full border border-blue-700 bg-sky-700 py-2 px-4 text-base text-white hover:bg-white hover:text-blue-700"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Button>
          </div>
        )}
      </nav>
      {/* Mobile menu ------------------------------------------------------------------------------------------------ */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Jemput Nikah</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </NavLink>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-700/10">
              <div className="space-y-2 py-6">
                {/* Hidden dropdown */}
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <NavLink
                  to="/kad-digital"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 font-bold block rounded-lg px-3 py-2"
                      : "text-gray-900 hover:bg-gray-50 block rounded-lg px-3 py-2"
                  }
                >
                  Kad Digital
                </NavLink>
                <NavLink
                  to="/pakej"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 font-bold block rounded-lg px-3 py-2"
                      : "text-gray-900 hover:bg-gray-50 block rounded-lg px-3 py-2"
                  }
                >
                  Pakej
                </NavLink>
                <NavLink
                  to="/tutorial"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 font-bold block rounded-lg px-3 py-2"
                      : "text-gray-900 hover:bg-gray-50 block rounded-lg px-3 py-2"
                  }
                >
                  Tutorial
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 font-bold block rounded-lg px-3 py-2"
                      : "text-gray-900 hover:bg-gray-50 block rounded-lg px-3 py-2"
                  }
                >
                  Hubungi kami
                </NavLink>
              </div>

              {user ? (
                user.isAdmin ? (
                  <div className="py-6">
                    <Dropdown label={user.name} dismissOnClick={false}>
                      <Dropdown.Item
                        onClick={() => {
                          setMobileMenuOpen(false), navigateTo("/admin/upload");
                        }}
                        className="hover:bg-blue-100 text-blue-700"
                      >
                        ADMIN DASHBOARD
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setMobileMenuOpen(false), navigateTo("/tempahan");
                        }}
                        className="hover:bg-blue-100 text-blue-700"
                      >
                        REKOD TEMPAHAN
                      </Dropdown.Item>

                      <Dropdown.Item
                        onClick={() => {
                          logoutUser;
                        }}
                        className="hover:bg-red-100 text-red-700"
                      >
                        Sign out
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                ) : (
                  <div className="py-6">
                    <Dropdown label={user.name} dismissOnClick={false}>
                      <Dropdown.Item
                        onClick={() => {
                          setMobileMenuOpen(false), navigateTo("/profile");
                        }}
                        className="hover:bg-blue-100 text-blue-700"
                      >
                        PROFILE
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setMobileMenuOpen(false), navigateTo("/tempahan");
                        }}
                        className="hover:bg-blue-100 text-blue-700"
                      >
                        REKOD TEMPAHAN
                      </Dropdown.Item>

                      <Dropdown.Item
                        onClick={() => {
                          logoutUser;
                        }}
                        className="hover:bg-red-100 text-red-700"
                      >
                        Sign out
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                )
              ) : (
                <div className="py-6">
                  <NavLink
                    onClick={() => setMobileMenuOpen(false)}
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold  leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log In
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;

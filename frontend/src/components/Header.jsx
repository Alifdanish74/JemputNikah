import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Dropdown, Modal } from "flowbite-react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserContext } from "../customhooks/UserContext";
import axios from "axios";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false); // Toggle for Product Dropdown
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
              alt="Logo"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
            <span className="flex justify-center items-center text-lg text-gray-700">
              Jemput Kahwin
            </span>
          </NavLink>
        </div>

        {/* Mobile menu toggle */}
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

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {/* Dropdown for Product */}
          <div
            className="relative"
            onMouseEnter={() => setShowProductDropdown(true)}
            onMouseLeave={() => setShowProductDropdown(false)}
          >
            <button className="flex items-center gap-x-1 text-base font-semibold text-gray-900">
              Product
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </button>
            {showProductDropdown && (
              <div className="absolute left-0 z-10 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                {/* Replace these items with actual navigation */}
                <p className="font-semibold text-gray-700">Product 1</p>
                <p className="font-semibold text-gray-700">Product 2</p>
              </div>
            )}
          </div>
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
        </div>

        {/* Login/Account Management */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <Dropdown color="blue" label={user.name} dismissOnClick={false}>
              {user.isAdmin ? (
                <Dropdown.Item onClick={() => navigateTo("/admin")}>
                  Admin Dashboard
                </Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => navigateTo("/profile")}>
                  Profile
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={logoutUser} color="failure">
                Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Button onClick={navigateToLogin} color="blue">
              Log in
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <Modal show={mobileMenuOpen} size="sm" onClose={() => setMobileMenuOpen(false)}>
        <Modal.Header>
          <div className="flex justify-between items-center">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
              <img
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                alt="Logo"
                className="h-8 w-auto"
              />
            </NavLink>
            <button onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <NavLink
              to="/kad-digital"
              className="text-gray-700 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kad Digital
            </NavLink>
            <NavLink
              to="/pakej"
              className="text-gray-700 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pakej
            </NavLink>
            <NavLink
              to="/tutorial"
              className="text-gray-700 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tutorial
            </NavLink>
            {user && (
              <Button
                onClick={() => {
                  logoutUser();
                  setMobileMenuOpen(false);
                }}
                color="failure"
              >
                Sign out
              </Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </header>
  );
}

export default Header;

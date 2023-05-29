import React, { useState, useEffect } from "react";
import {
  MdSpaceDashboard,
  MdPlayArrow,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FaStickyNote } from "react-icons/fa";
import { BsArchiveFill } from "react-icons/bs";
import { GrNext } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import PageHeading from "./PageHeading";
import { supabase } from "../../supabase";

const menu = [
  {
    menu: "Dashboard",
    path: "/",
    icon: MdSpaceDashboard,
  },
  {
    menu: "Your Notes",
    path: "/notes",
    icon: FaStickyNote,
  },
  {
    menu: "Archived Notes",
    path: "/archived",
    icon: BsArchiveFill,
  },
];

function SidebarApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      navigate("/signin");
      const session = supabase.auth.getSession();
      const isLoggedIn = session !== null;
    }
  };

  const MobileComponent = () => {
    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleMenuClick = (menu) => {
      setSelectedMenu(menu);
      setIsOpen(false); // Close the sidebar
    };

    return (
      <div>
        <div
          className={` fixed top-2 left-0 z-40 h-screen ${
            isOpen ? "bg-[#4d4732]" : ""
          }`}
        >
          <div
            className={` ${
              isOpen ? "" : "justify-end"
            } bg-[#4d4732] p-3 rounded-r-xl flex flex-row`}
            onClick={toggleSidebar}
          >
            <img
              src="\src\assets\Dnotes.png"
              className={`h-6 sm:h-8 ${isOpen ? "mr-3" : "mr-0"}`}
              alt="Dnotes Logo"
            />
            {!isOpen && (
              <MdKeyboardArrowRight size={"1.5rem"} className="text-white" />
            )}
            {isOpen && (
              <span className="self-center text-xl text-white font-semibold whitespace-nowrap dark:text-white">
                DNotes
              </span>
            )}
          </div>
          <div className={`${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <ul className="space-y-2 font-medium my-5">
              {menu.map((item) => {
                const isSelected = item.path === selectedMenu?.path;
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center p-2 rounded-lg ${
                        isOpen ? "" : "justify-end"
                      } ${
                        isSelected
                          ? "bg-gray-100 text-[#4d4732] dark:bg-gray-700 dark:text-[#4d4732]"
                          : "text-white hover:bg-gray-100 hover:text-[#4d4732] dark:hover:bg-gray-700 dark:text-white"
                      }`}
                      onClick={() => handleMenuClick(item)}
                    >
                      <Icon size={"1.5rem"} />
                      {isOpen && <span className="ml-3">{item.menu}</span>}
                    </Link>
                  </li>
                );
              })}
              <li
                key="signout"
                className={`flex items-center p-2 rounded-lg ${
                  isOpen ? "" : "justify-end"
                } text-white hover:bg-gray-100 hover:text-[#4d4732] dark:hover:bg-gray-700 dark:text-white`}
                onClick={handleLogout}
              >
                <IoLogOut size={"1.75rem"} />
                {isOpen && <span className="ml-3 ">Sign Out</span>}
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`p-5 bg-[#fdfcf6] h-screen mt-12 sm:mt-0 ${
            isOpen
              ? "sidebar-open ml-2 sm:ml-64"
              : "sidebar-close ml-2 sm:ml-20"
          }`}
          // className={`p-10 bg-[#fdfcf6] h-screen ${
          //   isOpen ? "sm:ml-64" : "ml-20"
          // }`}
        >
          <Outlet />
        </div>
      </div>
    );
  };

  const DesktopComponent = () => {
    return (
      <div>
        <aside
          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isOpen
              ? "-translate-x-full sm:translate-x-0"
              : "-translate-x-full sm:-translate-x-3/4"
          }`}
          aria-label="Sidebar"
          style={{ transition: "transform 0.5s ease" }}
        >
          <div className="h-full px-3 py-8 overflow-y-auto bg-[#4d4732] dark:bg-gray-800">
            <div
              className={`flex flex-row p-2 ${isOpen ? "" : "justify-end"}`}
              onClick={toggleSidebar}
            >
              <img
                src="\src\assets\Dnotes.png"
                className={`h-6 sm:h-8 ${isOpen ? "mr-3" : "mr-0"}`}
                alt="Dnotes Logo"
              />
              {isOpen && (
                <span className="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white">
                  DNotes
                </span>
              )}
            </div>
            <ul className="space-y-2 font-medium my-5">
              {menu.map((item) => {
                const isSelected = item.path === selectedMenu?.path;
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center p-2 rounded-lg ${
                        isOpen ? "" : "justify-end"
                      } ${
                        isSelected
                          ? "bg-gray-100 text-[#4d4732] dark:bg-gray-700 dark:text-[#4d4732]"
                          : "text-white hover:bg-gray-100 hover:text-[#4d4732] dark:hover:bg-gray-700 dark:text-white"
                      }`}
                    >
                      <Icon size={"1.5rem"} />
                      {isOpen && <span className="ml-3">{item.menu}</span>}
                    </Link>
                  </li>
                );
              })}
              <li
                key="signout"
                className={`flex items-center p-2 rounded-lg ${
                  isOpen ? "" : "justify-end"
                } text-white hover:bg-gray-100 hover:text-[#4d4732] dark:hover:bg-gray-700 dark:text-white`}
                onClick={handleLogout}
              >
                <IoLogOut size={"1.75rem"} />
                {isOpen && <span className="ml-3 ">Sign Out</span>}
              </li>
            </ul>
          </div>
        </aside>
        <div
          className={`p-10 bg-[#fdfcf6] h-screen mt-5 sm:mt-0 ${
            isOpen
              ? "sidebar-open ml-2 sm:ml-64"
              : "sidebar-close ml-2 sm:ml-20"
          }`}
          // className={`p-10 bg-[#fdfcf6] h-screen ${
          //   isOpen ? "sm:ml-64" : "ml-20"
          // }`}
        >
          <Outlet />
        </div>
      </div>
    );
  };

  const selectedMenu = menu.find((item) => item.path === location.pathname);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return <div>{isMobile ? <MobileComponent /> : <DesktopComponent />}</div>;
}

export default SidebarApp;

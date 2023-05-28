import React from "react";
import { Sidebar } from "flowbite-react";
import { MdSpaceDashboard } from "react-icons/md";
import { Outlet, Link } from "react-router-dom";

function SidebarApp() {
  const menu = [
    {
      menu: "Dashboard",
      path: "/",
      icon: MdSpaceDashboard,
    },
    {
      menu: "Your Notes",
      path: "/notes",
      icon: MdSpaceDashboard,
    },
    {
      menu: "Archived Notes",
      path: "/archived",
      icon: MdSpaceDashboard,
    },
  ];
  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-sky-600 dark:bg-gray-800">
          <a
            href="https://flowbite.com/"
            className="flex items-center pl-2.5 mb-5"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-7"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <ul className="space-y-2 font-medium">
            {menu.map((menu) => {
              return (
                <li key={menu.path}>
                  <Link
                    to={menu.path}
                    className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <menu.icon size={"1.5rem"} />
                    <span className="ml-3">{menu.menu}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
}

export default SidebarApp;

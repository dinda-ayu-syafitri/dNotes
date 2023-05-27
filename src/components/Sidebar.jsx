import React from "react";
import { Sidebar } from "flowbite-react";
import { MdSpaceDashboard } from "react-icons/md";

function SidebarApp() {
  return (
    <div>
      <Sidebar className="bg-sky-600 text-white">
        <Sidebar.Logo
          href="#"
          img="src\assets\react.svg"
          imgAlt="Flowbite logo"
        >
          Flowbite
        </Sidebar.Logo>
        <Sidebar.Items className="text-white ">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={MdSpaceDashboard}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={MdSpaceDashboard}>
              Kanban
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={MdSpaceDashboard}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={MdSpaceDashboard}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={MdSpaceDashboard}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={MdSpaceDashboard}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={MdSpaceDashboard}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default SidebarApp;

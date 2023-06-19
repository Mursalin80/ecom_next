"use client";

import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

export default function ProfileTabs({ profile, address }) {
  console.log(profile, address);
  return (
    <Tabs.Group aria-label="Default tabs" style="default">
      <Tabs.Item active icon={HiUserCircle} title="Profile">
        <p className="text-2xl text-blue-400">{profile.name}</p>
        <p>{profile.email}</p>
      </Tabs.Item>
      <Tabs.Item icon={MdDashboard} title="Address">
        <p>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Dashboard tab's associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </Tabs.Item>
      <Tabs.Item icon={HiAdjustments} title="Settings">
        <p>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Settings tab's associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </Tabs.Item>
      <Tabs.Item icon={HiClipboardList} title="Contacts">
        <p>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Contacts tab's associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </Tabs.Item>
      <Tabs.Item disabled title="Disabled">
        <p>Disabled content</p>
      </Tabs.Item>
    </Tabs.Group>
  );
}

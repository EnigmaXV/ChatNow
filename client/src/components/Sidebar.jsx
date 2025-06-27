import React from "react";
import userPic from "../assets/small-user-pic.png";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Target } from "lucide-react";

const USERS = [
  { name: "Jane Doe", status: "Offline", avatar: userPic },
  { name: "Emma Thompson", status: "Offline", avatar: userPic },
  { name: "Olivia Miller", status: "Offline", avatar: userPic },
  { name: "Sophia Davis", status: "Offline", avatar: userPic },
  { name: "Ava Wilson", status: "Offline", avatar: userPic },
  { name: "Isabella Brown", status: "Offline", avatar: userPic },
];

const Sidebar = ({ users, selectedUser, onSetSelectedUser }) => {
  const contacts = users.length > 0 ? users : USERS;
  const [filterUsers, setFilterUsers] = useState(false);

  const { onlineUsers } = useAuthStore();

  const displayedUsers = filterUsers
    ? contacts.filter((user) => onlineUsers.includes(user._id))
    : contacts;

  return (
    <div className="w-1/3 border-r border-base-300 p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Contacts</h2>
      <label className="label cursor-pointer text-sm text-base-content/60">
        <input
          type="checkbox"
          className="checkbox checkbox-xs mr-2"
          checked={filterUsers}
          onChange={(e) => setFilterUsers(e.target.checked)}
        />
        Show online only ({onlineUsers.length - 1} online)
      </label>

      <ul className="mt-4 space-y-3 overflow-y-auto pr-1 flex-1">
        {displayedUsers.map((c, idx) => (
          <li
            key={idx}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
              c._id === selectedUser?._id
                ? "bg-primary/10"
                : "hover:bg-base-200 "
            }`}
            onClick={() => onSetSelectedUser(c)}
          >
            <div
              className={`avatar ${
                onlineUsers.includes(c._id) ? "avatar-online" : ""
              }`}
            >
              <div className="w-10 rounded-full">
                <img src={c.profilePicture || userPic} alt={c.name} />
              </div>
            </div>
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-base-content/50">{c.status}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

import React from "react";

import userPic from "../assets/small-user-pic.png";
import MessageInput from "../components/MessageInput";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import dayjs from "dayjs";

const MSG = [
  { sender: "Jane Doe", time: "19:46", text: "Hey John! How's it going? 😊" },
  { sender: "You", time: "19:46", text: "Heyy! Long time no see! 👀" },
  { sender: "You", time: "19:47", text: "Doing great, wbu?" },
  { sender: "Jane Doe", time: "19:47", text: "Not that great, just fine 😌" },
  { sender: "Jane Doe", time: "19:48", text: "Studying for the midterms..." },
];

const ChatApp = () => {
  const { users, getUsers, getMessages, messages } = useChatStore();
  const { user } = useAuthStore();
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    getUsers();

    getMessages(selectedUser?._id);
  }, [selectedUser]);
  console.log("current active user:", user);

  console.log("messages:", messages);
  console.log("selectedUser:", selectedUser);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 text-base-content">
      <div className="w-full max-w-6xl h-[800px] flex rounded-lg shadow-lg overflow-hidden bg-base-100">
        <Sidebar users={users} onSetSelectedUser={setSelectedUser} />
        {/* Chat Panel */}
        <div className="w-2/3 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-base-300 p-4">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={selectedUser?.profilePicture || userPic}
                  alt={selectedUser?.name || "User Avatar"}
                />
              </div>
            </div>
            <div>
              <div className="font-semibold">{selectedUser?.name || ""}</div>
              <div className="text-xs text-base-content/50">Offline</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200">
            {messages.map((msg, i) => {
              const isMe = msg.sender === user._id;
              return (
                <div
                  className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                  key={i}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={
                          isMe
                            ? user.profilePicture
                            : selectedUser?.profilePicture || userPic
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    <time className="text-xs opacity-50">
                      {dayjs(msg.createdAt).format("HH:mm")}
                    </time>
                  </div>
                  <div className="chat-bubble">{msg.content}</div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
              );
            })}
          </div>
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

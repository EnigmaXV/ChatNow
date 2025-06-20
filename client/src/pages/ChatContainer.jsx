import React from "react";

import userPic from "../assets/small-user-pic.png";
import MessageInput from "../components/MessageInput";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import dayjs from "dayjs";
import { MessageCircle, Users, Sparkles } from "lucide-react";

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

          {!selectedUser ? (
            // Welcome Page
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="text-center max-w-md mx-auto p-8">
                {/* Welcome Icon */}
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Welcome Text */}
                <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Welcome to ChatNow
                </h1>
                <p className="text-base-content/70 mb-8 text-lg">
                  Select a user from the sidebar to start chatting and stay
                  connected with your friends!
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm">
                        Connect with Friends
                      </div>
                      <div className="text-xs text-base-content/60">
                        Start conversations instantly
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm">
                        Real-time Messaging
                      </div>
                      <div className="text-xs text-base-content/60">
                        Instant message delivery
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-primary">{users.length}</div>
                    <div className="text-base-content/60">Available Users</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-secondary">24/7</div>
                    <div className="text-base-content/60">Online Support</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Chat Messages
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200">
              {messages.map((msg, i) => {
                const isMe = msg.sender === user._id;
                return (
                  <div
                    className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                    key={i}
                  >
                    {/* Avatar */}
                    <div className="chat-image avatar self-end">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          alt="User avatar"
                          src={
                            isMe
                              ? user.profilePicture
                              : selectedUser?.profilePicture || userPic
                          }
                        />
                      </div>
                    </div>

                    {/* Chat content */}
                    <div>
                      {/* Timestamp */}
                      <div className="chat-header mb-1">
                        <time className="text-xs text-gray-400">
                          {dayjs(msg.createdAt).format("HH:mm")}
                        </time>
                      </div>

                      {/* Message Bubble */}
                      {msg.content && (
                        <div className="chat-bubble break-words max-w-xs">
                          {msg.content}
                        </div>
                      )}

                      {/* Attached Image */}
                      {msg.image && (
                        <div className="mt-2 chat-bubble break-words max-w-xs">
                          <img
                            src={msg.image}
                            alt="Message attachment"
                            className="rounded-lg max-w-[200px]"
                          />
                        </div>
                      )}

                      {/* Status */}
                      <div className="chat-footer mt-1 text-xs text-gray-400">
                        Delivered
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {selectedUser && <MessageInput selectedUser={selectedUser} />}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

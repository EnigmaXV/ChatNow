import React from "react";

import userPic from "../assets/small-user-pic.png";
import MessageInput from "../components/MessageInput";

const contacts = [
  { name: "Jane Doe", status: "Offline", avatar: userPic },
  { name: "Emma Thompson", status: "Offline", avatar: userPic },
  { name: "Olivia Miller", status: "Offline", avatar: userPic },
  { name: "Sophia Davis", status: "Offline", avatar: userPic },
  { name: "Ava Wilson", status: "Offline", avatar: userPic },
  { name: "Isabella Brown", status: "Offline", avatar: userPic },
];

const messages = [
  { sender: "Jane Doe", time: "19:46", text: "Hey John! How's it going? 😊" },
  { sender: "You", time: "19:46", text: "Heyy! Long time no see! 👀" },
  { sender: "You", time: "19:47", text: "Doing great, wbu?" },
  { sender: "Jane Doe", time: "19:47", text: "Not that great, just fine 😌" },
  { sender: "Jane Doe", time: "19:48", text: "Studying for the midterms..." },
];

const ChatApp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 text-base-content">
      <div className="w-full max-w-6xl h-[800px] flex rounded-lg shadow-lg overflow-hidden bg-base-100">
        <div className="w-1/3 border-r border-base-300 p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Contacts</h2>
          <label className="label cursor-pointer text-sm text-base-content/60">
            <input
              type="checkbox"
              className="checkbox checkbox-xs mr-2"
              disabled
            />
            Show online only (0 online)
          </label>
          {/* Scrollable Contact List */}
          {/* //TODO Move to a separate component */}
          <ul className="mt-4 space-y-3 overflow-y-auto pr-1 flex-1">
            {contacts.map((c, idx) => (
              <li
                key={idx}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                  idx === 0 ? "bg-primary/10" : "hover:bg-base-200"
                }`}
              >
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={c.avatar} alt={c.name} />
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

        {/* Chat Panel */}
        <div className="w-2/3 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-base-300 p-4">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={userPic} alt="Jane Doe" />
              </div>
            </div>
            <div>
              <div className="font-semibold">Jane Doe</div>
              <div className="text-xs text-base-content/50">Offline</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200">
            {messages.map((msg, i) => {
              const isMe = msg.sender === "You";
              return (
                <div
                  className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                  key={i}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {msg.sender}
                    <time className="text-xs opacity-50">{msg.time}</time>
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
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

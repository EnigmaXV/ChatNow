import React, { useRef, useState } from "react";
import { ImagePlus, Send, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const MessageInput = ({ selectedUser }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const imagePreview = image ? URL.createObjectURL(image) : null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!content && !image) return;
    sendMessage(selectedUser._id, content, image);
    setContent("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="p-2 bg-base-100 rounded-lg shadow-md flex flex-col gap-2">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="btn btn-ghost btn-circle"
          aria-label="Upload image"
        >
          <ImagePlus />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <input
          type="text"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input flex-1"
        />
        <button type="submit" className="btn px-4">
          <Send />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

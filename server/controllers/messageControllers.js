const Message = require("../models/messageModel");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const User = require("../models/userModel");

const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { content } = req.body;
    const senderId = req.user.userId;

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });
    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path);
      message.image = uploadRes.secure_url;
    }
    await message.save();
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: {
        id: message._id,
        sender: message.sender,
        receiver: message.receiver,
        content: message.content,
        image: message.image,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      },
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user.userId;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(StatusCodes.OK).json({
      success: true,
      messages,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const message = await Message.findByIdAndDelete(messageId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const getContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(StatusCodes.OK).json({
      success: true,
      contacts: filteredUsers,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
  getContacts,
};

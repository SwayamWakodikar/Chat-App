import Msg from "../models/messageModel.js";

export const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Msg.find({
      $or: [
        { sender: from, receiver: to },
        { sender: to, receiver: from }, // Check both directions
      ],
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.content,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Msg.create({
      content: message,
      sender: from,
      receiver: to,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to database" });
  } catch (ex) {
    next(ex);
  }
};

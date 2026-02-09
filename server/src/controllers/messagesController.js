// In-memory storage for messages
const messages = [];

export const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const projectMessages = messages
      .filter(msg => 
        (msg.sender === from && msg.receiver === to) || 
        (msg.sender === to && msg.receiver === from)
      )
      .map(msg => {
        return {
          fromSelf: msg.sender === from,
          message: msg.content,
        };
      });

    res.json(projectMessages);
  } catch (ex) {
    next(ex);
  }
};

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    messages.push({
      content: message,
      sender: from,
      receiver: to,
      updatedAt: new Date()
    });

    return res.json({ msg: "Message added successfully." });
  } catch (ex) {
    next(ex);
  }
};

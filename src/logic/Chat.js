// logic/Chat.js
const chatMessages = []; // Store chat messages (you may want to use a database)

// Send a chat message
exports.sendChatMessage = (req, res) => {
  const { message, sender, recipient } = req.body;
  
  // Store the chat message in the chatMessages array or your database
  chatMessages.push({ message, sender, recipient });
  
  // You can also emit the message to connected clients using Socket.IO
  io.emit('chatMessage', { message, sender, recipient });
  
  res.status(200).json({ message: 'Message sent successfully' });
};

// Retrieve chat messages
exports.getChatMessages = (req, res) => {
  // Retrieve chat messages from chatMessages array or your database
  res.status(200).json(chatMessages);
};

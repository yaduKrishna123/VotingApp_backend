const chatMessages = []; 

exports.sendChatMessage = (req, res) => {
  const { message, sender, recipient } = req.body;
  
  chatMessages.push({ message, sender, recipient });
  
  io.emit('chatMessage', { message, sender, recipient });
  
  res.status(200).json({ message: 'Message sent successfully' });
};

exports.getChatMessages = (req, res) => {
  res.status(200).json(chatMessages);
};

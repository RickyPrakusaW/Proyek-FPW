import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Chat.css';

function Chat() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userId = 'adminId'; // Ganti dengan ID Admin yang sesuai

  // Fetch all chats for the Admin
  useEffect(() => {
    axios
      .get(`/api/admin/user/${userId}`)
      .then((response) => setChats(response.data))
      .catch((error) => console.error('Error fetching chats:', error));
  }, [userId]);

  // Fetch messages for the selected chat
  useEffect(() => {
    if (selectedChat) {
      axios
        .get(`/api/admin/${selectedChat._id}/messages`)
        .then((response) => setMessages(response.data))
        .catch((error) => console.error('Error fetching messages:', error));
    }
  }, [selectedChat]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      axios
        .post(`/api/admin/${selectedChat._id}/messages`, {
          sender: userId,
          senderRole: 'Admin',
          message: newMessage,
        })
        .then((response) => {
          setMessages([...messages, response.data]);
          setNewMessage('');
        })
        .catch((error) => console.error('Error sending message:', error));
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h2>Chats</h2>
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`chat-item ${selectedChat && chat._id === selectedChat._id ? 'selected' : ''}`}
            onClick={() => setSelectedChat(chat)}
          >
            {chat.participants.map((participant) => (
              <p key={participant}>{participant}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`message ${message.senderRole === 'Admin' ? 'admin' : 'other'}`}
                >
                  <p>{message.message}</p>
                  <small>{message.senderRole}</small>
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;

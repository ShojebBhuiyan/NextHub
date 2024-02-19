"use client"
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chatroom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const socket = io();

  useEffect(() => {
    socket.on('message', (message: string) => {
      // Append the new message to the list of messages
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      // Append the new message to the list of messages
      setMessages([...messages, message]);
      
      // Emit the message to the server
      socket.emit('message', message);
      
      // Clear the input field
      setMessage('');
    } else {
      console.error('Message cannot be empty');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatroom;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Channel {
  id: number;
  name: string;
}

interface Message {
  id: number;
  content: string;
}

const App: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get<Channel[]>('http://localhost:8000/api/channels');
        setChannels(response.data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };
    fetchChannels();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChannel) {
        try {
          const response = await axios.get<Message[]>(`http://localhost:8000/api/channels/${selectedChannel.id}/messages`);
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
    fetchMessages();
  }, [selectedChannel]);

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        const response = await axios.post<Message>(
          `http://localhost:8000/api/channels/${selectedChannel!.id}/messages`,
          { content: newMessage }
        );
        setNewMessage('');
        setMessages(prevMessages => [...prevMessages, response.data]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <div>
        <h2>Channels</h2>
        <ul>
          {channels.map(channel => (
            <li key={channel.id} onClick={() => handleChannelSelect(channel)}>
              {channel.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Messages</h2>
        {selectedChannel ? (
          <div>
            <h3>{selectedChannel.name}</h3>
            <ul>
              {messages.map(message => (
                <li key={message.id}>{message.content}</li>
              ))}
            </ul>
            <div>
              <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <p>Select a channel to view messages.</p>
        )}
      </div>
    </div>
  );
};

export default App;

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MessageList from "./GetMessages";
import EditMessage from "./editMessage";
import DeleteMessage from "./deleteMessage";
import './ChannelPage.css'; 

interface Channel {
  channel_id: string;
  channel_name: string;
  messages: Message[];
}

interface Message {
  message_id: {
    String: string;
    Valid: boolean;
  };
  channel_id: string;
  user_id: string;
  content: {
    String: string;
    Valid: boolean;
  };
  edited_at: {
    String: string;
    Valid: boolean;
  };
}

interface ChannelPageProps {
  channel?: any;
}


const ChannelPage: React.FC<ChannelPageProps> = ({ channel }) => {
//   const { channelName } = useParams<{ channelName: string }>();
const navigate = useNavigate();

//   const channel = channels.find((channel) => channel.channel_name === channelName);

  if (!channel) {
    return null;
  }

  const { messages } = channel;

// const GetMessages = () => {
//      navigate(`/GetMessages/`);
//    };


  return (
    <div className="slack-channel-page">
    <h2 className="slack-channel-page__title">Channel: {channel.channel_name}</h2>
    <h2 className="slack-channel-page__channel-id">ChannelID: {channel.channel_id}</h2>
    <h3 className="slack-channel-page__messages-title">Messages:</h3>
    <ul className="slack-channel-page__message-list">
      {messages.map((message:Message) => (
        <li key={message.message_id.String} className="slack-channel-page__message-item">
          <p className="slack-channel-page__message-info">Message ID: {message.message_id.String}</p>
          <p className="slack-channel-page__message-info">User ID: {message.user_id}</p>
          <p className="slack-channel-page__message-info">Content: {message.content.String}</p>
          <p className="slack-channel-page__message-info">Edited At: {message.edited_at.String}</p>
        </li>
      ))}
    </ul>
    <EditMessage onEditSuccess={() => ChannelPage(channel.channel_id)} />
    <DeleteMessage channelId={0} />
    <MessageList channelId={channel.channel_id} />
    <h3 className="slack-channel-page__reflection-instruction">
      To reflect the changes, please go back to the previous page.
    </h3>
  </div>
  );
};

export default ChannelPage;



/*
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Channel {
  channel_id: number;
  channel_name: string;
  messages: Message[];
}

interface Message {
  message_id: {
    String: string;
    Valid: boolean;
  };
  channel_id: number;
  user_id: string;
  content: {
    String: string;
    Valid: boolean;
  };
  edited_at: {
    String: string;
    Valid: boolean;
  };
}

interface ChannelPageProps {
  channelName: string;
  channels: Channel[];
}





const ChannelPage: React.FC<ChannelPageProps> = ({ channelName, channels }) => {
  const channel = channels.find((channel) => channel.channel_name === channelName);

  const navigate = useNavigate();

  if (!channel) {
    return null;
  }

  const { messages } = channel;

  const getMessages = () => {
    navigate("/GetMessages/");
  };

  return (
    <div>
      <h2>Channel: {channelName}</h2>
      <h3>Messages:</h3>
      <ul>
        {messages.map((message) => (
          <li key={message.message_id.String}>
            <p>User ID: {message.user_id}</p>
            <p>Content: {message.content.String}</p>
            <p>Edited At: {message.edited_at.String}</p>
          </li>
        ))}
      </ul>
      <button onClick={getMessages}>チャンネルにメッセージを送る</button>
    </div>
  );
};

export default ChannelPage;
*/
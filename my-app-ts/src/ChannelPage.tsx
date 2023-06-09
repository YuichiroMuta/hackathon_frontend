import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MessageList from "./GetMessages";
import EditMessage from "./editMessage";
import DeleteMessage from "./deleteMessage";

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
const handleClick = () => {
  ChannelPage(channel);
};
//   const channel = channels.find((channel) => channel.channel_name === channelName);

  if (!channel) {
    return null;
  }

  const { messages } = channel;

// const GetMessages = () => {
//      navigate(`/GetMessages/`);
//    };


  return (
    <div>
      <h2>Channel: {channel.channel_name}</h2>
      <h2>ChannelID:{channel.channel_id}</h2>
      <h3>Messages:</h3>
      <ul>
        {messages.map((message:Message) => (
          <li key={message.message_id.String}>
            <p>Message ID: {message.message_id.String}</p>
            <p>User ID: {message.user_id}</p>
            <p>Content: {message.content.String}</p>
            <p>Edited At: {message.edited_at.String}</p>
          </li>
        ))}
      </ul>
      {/* <button onClick={GetMessages}>チャンネルにメッセージを送る</button> */}
      <EditMessage onEditSuccess={() => ChannelPage(channel.channel_id)}/>
      <DeleteMessage channelId={0} />
      {/* <DeleteMessage messageId={messages.message_id} /> */}
      <MessageList channelId={channel.channel_id}/>
      <button onClick={handleClick}>変更を確認</button>
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
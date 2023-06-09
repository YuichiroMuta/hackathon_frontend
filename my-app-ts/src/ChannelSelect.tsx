import React from "react";
import { Link } from "react-router-dom";

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

interface UserData {
  user_id: string;
  channels: Channel[];
}

interface ChannelSelectProps {
  userData: UserData | null;
}

const ChannelSelect: React.FC<ChannelSelectProps> = ({ userData }) => {
  if (!userData) {
    return null;
  }

  return (
    <div>
      <h2>Select a channel:</h2>
      <ul>
        {userData.channels.map((channel) => (
          <li key={channel.channel_id}>
            <Link to={`/channel/${channel.channel_name}`}>{channel.channel_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelSelect;

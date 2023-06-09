import React from "react";
import { Link } from "react-router-dom";
import './ChannelSelection.css';

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
    <div className="slack-channel-selection">
      <h2 className="slack-channel-selection__title">Select a channel:</h2>
      <ul className="slack-channel-selection__list">
        {userData.channels.map((channel) => (
          <li key={channel.channel_id} className="slack-channel-selection__item">
            <Link className="slack-channel-selection__link" to={`/channel/${channel.channel_name}`}>
              {channel.channel_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
        }
export default ChannelSelect;

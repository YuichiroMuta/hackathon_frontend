import React, { useState, useEffect } from "react";
import axios from "axios";

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
    onSelectChannel: (channelName: string) => void;
}

interface MessageListProps {
    messages: Message[];
}

const ChannelSelect: React.FC<ChannelSelectProps> = ({
                                                         userData,
                                                         onSelectChannel
                                                     }) => {
    const [selectedChannel, setSelectedChannel] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (userData && userData.channels.length > 0) {
            setSelectedChannel(userData.channels[0].channel_name);
            onSelectChannel(userData.channels[0].channel_name);
        }
    }, [userData, onSelectChannel]);

    const handleSelectChannel = (channelName: string) => {
        setSelectedChannel(channelName);
        onSelectChannel(channelName);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Select a channel:</h2>
            <ul>
                {userData?.channels.map((channel) => (
                    <li
                        key={channel.channel_id}
                        onClick={() => handleSelectChannel(channel.channel_name)}
                        style={{ cursor: "pointer" }}
                    >
                        {channel.channel_name}
                    </li>
                ))}
            </ul>
            {selectedChannel && (
                <MessageList
                    messages={getMessages(selectedChannel, userData?.channels)}
                />
            )}
        </div>
    );
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => (
    <div>
        <h2>Messages:</h2>
        <ul>
            {messages.map((message) => (
                <li key={message.message_id.String}>
                    <p>User ID: {message.user_id}</p>
                    <p>Content: {message.content.String}</p>
                    <p>Edited At: {message.edited_at.String}</p>
                </li>
            ))}
        </ul>
    </div>
);

const getMessages = (channelName: string, channels: Channel[] | undefined): Message[] => {
    if (channels) {
        const channel = channels.find((c) => c.channel_name === channelName);
        if (channel) {
            return channel.messages;
        }
    }
    return [];
};

const GetUserChannels: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // ユーザーデータを取得する関数
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/user-channels?email=${email}`);
                setUserData(response.data);
                setIsLoading(false);
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data?.error || "An error occurred");
                } else {
                    setError("An error occurred");
                }
                setIsLoading(false);
            }
        };

        const fetchData = async () => {
            if (email) {
                await fetchUserData();
            }
        };

        fetchData();
    }, [email]);


        /*if (email) {
            fetchUserData();
        }
    }, [email]);

         */

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSelectChannel = (channelName: string) => {
        console.log("Selected channel:", channelName);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>User Channels:</h1>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <ChannelSelect
                userData={userData}
                onSelectChannel={handleSelectChannel}
            />
        </div>
    );
};

export default GetUserChannels;

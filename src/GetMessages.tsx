import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import EditMessage from "./editMessage"
import DeleteMessage from './deleteMessage';
import CreateMessage from './CreateMessage';
// import {setChannelId} from './GetUserChannels3';
import { useParams } from 'react-router-dom';
import { setChannelId } from './GetUserChannels3';



interface Message {
    message_id: string;
    channel_id: number;
    user_id: string;
    content: string;
    edited_at: string | null;
}

interface Props {
    channelId: any;
}


const MessageList: React.FC<Props> = ({channelId}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const HandleGetMessages = async (channelId: number) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8081/messages?channel_id=${channelId}`);
            setMessages(response.data);
            setLoading(false);
            setError('');
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    setError((axiosError.response.data as { error: string }).error);
                } else {
                    setError('Failed to fetch messages');
                }
            } else {
                setError('Failed to fetch messages');
            }
        }
    };

    useEffect(() => {
        HandleGetMessages(channelId);
    }, [channelId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {/* {messages.map((message) => (
                <div key={message.message_id}>
                    <p>Message ID: {message.message_id}</p>
                    <p>Channel ID: {message.channel_id}</p>
                    <p>User ID: {message.user_id}</p>
                    <p>Content: {message.content}</p>
                    <p>Edited At: {message.edited_at || 'Not edited'}</p>
                    <EditMessage
                        //messageId={message.message_id}
                        onEditSuccess={() => HandleGetMessages(channelId)}
                    />
                    <DeleteMessage messageId={message.message_id} />
                </div>   
            ))} */}
            <CreateMessage />
        </div>
    );
};

export default MessageList;

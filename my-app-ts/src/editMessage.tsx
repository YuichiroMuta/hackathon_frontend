import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
//import { isContentEditable } from '@testing-library/user-event/dist/types/utils';

interface EditMessageProps {
    onEditSuccess: () => void; // 編集成功時に親コンポーネントでの処理を行うためのコールバック関数
}

const EditMessage: React.FC<EditMessageProps> = ({ onEditSuccess }) => {
    const [messageId, setMessageId] = useState('');
    const [newContent, setNewContent] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'message_id') {
            setMessageId(event.target.value);
        } else if (event.target.name === 'content') {
            setNewContent(event.target.value);
        }
    };

    const handleEditMessage = async () => {
        try {
            const response = await axios.get(`https://curriculum-3-muta-yuichiro-hackathon-eaq52kewiq-uc.a.run.app/edit-message?message_id=${messageId}&content=${newContent}`);
            console.log(response.data);
            setError('');
            onEditSuccess(); // 編集成功時の処理を呼び出す
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    setError((axiosError.response.data as { error: string }).error);
                } else {
                    setError('Unknown error');
                }
            } else {
                setError('Unknown error');
            }
        }
    };

    return (
        <div>
            <h1>Edit Message</h1>
            {error && <p>Error: {error}</p>}
            <div>
                <label>
                    Message ID:
                    <input type="text" name="message_id" value={messageId} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <label>
                    New Content:
                    <input type="text" name="content" value={newContent} onChange={handleInputChange} />
                </label>
            </div>
            <button onClick={handleEditMessage}>Edit Message</button>
        </div>
    );
};

export default EditMessage;

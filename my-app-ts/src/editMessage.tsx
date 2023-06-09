import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './EditMessage.css';
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
        <div className="slack-edit-message">
    <h1 className="slack-edit-message__title">Edit Message</h1>
    {error && <p className="slack-edit-message__error">Error: {error}</p>}
    <div className="slack-edit-message__input-group">
      <label htmlFor="messageId" className="slack-edit-message__label">
        Message ID:
      </label>
      <input
        type="text"
        id="messageId"
        name="message_id"
        className="slack-edit-message__input"
        value={messageId}
        onChange={handleInputChange}
      />
    </div>
    <div className="slack-edit-message__input-group">
      <label htmlFor="newContent" className="slack-edit-message__label">
        New Content:
      </label>
      <input
        type="text"
        id="newContent"
        name="content"
        className="slack-edit-message__input"
        value={newContent}
        onChange={handleInputChange}
      />
    </div>
    <button className="slack-edit-message__button" onClick={handleEditMessage}>
      Edit Message
    </button>
  </div>
    );
};

export default EditMessage;

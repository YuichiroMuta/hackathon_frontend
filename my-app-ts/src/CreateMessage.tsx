import React, { useState } from 'react';
import './CreateMessage.css'; 

const CreateMessage: React.FC = () => {
    const [channelId, setChannelId] = useState('');
    const [userId, setUserId] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleCreateMessage = async () => {
        // 入力値のバリデーション
        if (!channelId || !userId || !content) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('https://curriculum-3-muta-yuichiro-hackathon-eaq52kewiq-uc.a.run.app/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channelId: channelId,
                    userId: userId,
                    content: content
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                setError(errorResponse.error);
                return;
            }

            // メッセージ作成成功
            setError('');
            setChannelId('');
            setUserId('');
            setContent('');
        } catch (error) {
            setError('Failed to create message');
        }
    };

    return (
        <div className="slack-create-message">
    <h2 className="slack-create-message__title">Create Message</h2>
    {error && <p className="slack-create-message__error">Error: {error}</p>}
    <form>
      <div className="slack-create-message__input-group">
        <label htmlFor="channelId" className="slack-create-message__label">
          Channel ID:
        </label>
        <input
          type="text"
          id="channelId"
          className="slack-create-message__input"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
        />
      </div>
      <div className="slack-create-message__input-group">
        <label htmlFor="userId" className="slack-create-message__label">
          User ID:
        </label>
        <input
          type="text"
          id="userId"
          className="slack-create-message__input"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className="slack-create-message__input-group">
        <label htmlFor="content" className="slack-create-message__label">
          Content:
        </label>
        <input
          type="text"
          id="content"
          className="slack-create-message__input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="slack-create-message__button"
        onClick={handleCreateMessage}
      >
        Create Message
      </button>
    </form>
  </div>
    );
};

export default CreateMessage;
